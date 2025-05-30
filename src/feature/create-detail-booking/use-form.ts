import {
  TAdditionalConditions,
  TBasicInfo,
} from "@/shared/model/types/booking";
import { useState } from "react";
import { toast } from "@/shared/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import instance from "@/shared/model/api/axios-instance";
import { useNavigate } from "react-router";
import { formData } from "./types";
import { queryClient } from "@/shared/model/api/query-client";

const steps = [
  {
    id: 1,
    title: "Этап 1/5: Основная информация",
  },
  {
    id: 2,
    title: "Этап 2/5: Продолжение основной информации",
  },
  {
    id: 2,
    title: "Этап 3/5: Доплнительная инфомация",
  },
  {
    id: 2,
    title: "Этап 4/5: Продолжение дополнительной информации",
  },
  {
    id: 3,
    title: "Этап 5/5: Проверка данных",
  },
];

type mutateData = {
  basicInfo: TBasicInfo;
  additionalConditions: TAdditionalConditions;
};

export default function useForm() {
  const navigate = useNavigate();
  const createBookingShortmutation = useMutation({
    mutationFn: async (data: mutateData) => {
      const response = await instance.post("/booking/detail", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Заявка создна",
        description: "Можете увидеть ее на странице мои заявки",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
  });

  const [formData, setFormData] = useState<formData>({
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
    additionalInformation: "",
    loadingMethod: "",
    isCharterNeeded: false,
    maxVehicleHeight: "",
    loadingType: "normal",
    vehicleType: "",
    unloadingType: "",
    estimatedLoadingDate: new Date(),
    paymentType: "nds",
  });
  const updateFormData = (stepData: Partial<formData>) => {
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
        distance: formData.distance,
        loadingLocation: {
          name: formData.loadingLocation.name,
          coordinates: formData.loadingLocation.coordinates,
        },
        unLoadingLocation: formData.unLoadingLocation,
        tonnage: formData.tonnage,
        culture: formData.culture,
        ratePerTon: formData.ratePerTon,
        companyName: formData.companyName,
        contact: {
          name: formData.contact.name,
          phone: formData.contact.phone,
        },
      },
      additionalConditions: {
        additionalInformation:
          formData.additionalInformation.length === 0
            ? null
            : formData.additionalInformation,
        loadingMethod:
          formData.loadingMethod.length === 0 ? null : formData.loadingMethod,
        isCharterNeeded: formData.isCharterNeeded,
        maxVehicleHeight:
          formData.maxVehicleHeight.length === 0
            ? null
            : formData.maxVehicleHeight,
        loadingType: formData.loadingType,
        vehicleType:
          formData.vehicleType.length === 0 ? null : formData.vehicleType,
        unloadingType:
          formData.unloadingType.length === 0 ? null : formData.unloadingType,
        estimatedLoadingDate: formData.estimatedLoadingDate,
        paymentType: formData.paymentType,
      },
    };
    console.log("data", data);
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
