import { TBasicInfo } from "@/shared/model/types/booking";
import { useState } from "react";
import { toast } from "@/shared/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import instance from "@/shared/model/api/axios-instance";
import { useNavigate } from "react-router";

const steps = [
  {
    id: 1,
    title: "Этап 1/3: Основная информация",
  },
  {
    id: 2,
    title: "Этап 2/3: Продолжение основной информации",
  },
  {
    id: 3,
    title: "Этап 3/3: Проверка данных",
  },
];

type mutateData = {
  basicInfo: TBasicInfo;
};

export default function useForm() {
  const navigate = useNavigate();
  const createBookingShortmutation = useMutation({
    mutationFn: async (data: mutateData) => {
      const response = await instance.post("/booking/short", data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Заявка создна",
        description: "Можете увидеть ее на странице мои заявки",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
  });

  const [formData, setFormData] = useState<TBasicInfo>({
    distance: "",
    loadingLocation: {
      name: "",
      coordinates: null,
    },
    unLoadingLocation: "",
    tonnage: "",
    culture: "",
    ratePerTon: "0",
    companyName: "",
    contact: {
      name: "",
      phone: "",
    },
  });
  const updateFormData = (stepData: Partial<TBasicInfo>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (
      !formData.distance ||
      !formData.unLoadingLocation ||
      !formData.tonnage ||
      !formData.culture ||
      !formData.ratePerTon ||
      !formData.companyName ||
      !formData.loadingLocation.name ||
      !formData.contact.name ||
      !formData.contact.phone
    ) {
      toast({
        title: "Заполните все поля",
        description: "Чтобы создать заявку, нужно заполнить все поля",
        variant: "destructive",
      });
      console.log("formData", formData);

      return;
    } else if (!formData.loadingLocation.coordinates) {
      toast({
        title: "Укажите точку погрузки на карте",
        description: "Это нужно, чтобы вашу заявку мжно было найти на карте",
        variant: "destructive",
      });

      return;
    }

    const data = {
      basicInfo: {
        ...formData,
      },
    };
    createBookingShortmutation.mutate(data);
  };

  const [clueIsView, setClueIsView] = useState(true);
  const [clueIsInput, setClueIsInput] = useState(false);
  return {
    clue: {
      clueIsView,
      setClueIsView,
      clueIsInput,
      setClueIsInput,
    },
    steps,
    form: {
      formData,
      updateFormData,
      handleSubmit,
    },

    step: {
      currentStep,
      handleNext,
      handleBack,
    },
  };
}
