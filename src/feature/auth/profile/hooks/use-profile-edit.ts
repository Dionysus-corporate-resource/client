import { toast } from "@/shared/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUpdateProfile, userApi } from "../api/user-api";
import { queryClient } from "@/shared/model/api/query-client";
import { IUserRoles } from "@/shared/model/types/user";
import { useAuth } from "@/app/providers/auth-provider";
import { useNavigate } from "react-router";

type IFormData = {
  userName: string;
  email: string;
  phone: string;
  roles: IUserRoles;
  nameCompany: string | null;
};

export default function useProfileEdit() {
  const authContext = useAuth();
  const navigate = useNavigate();
  // запросы и сосония
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getDataProfile(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: IUpdateProfile) => userApi.updateDataProfile(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const [isChangeForm, setIsChangeForm] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    userName: "",
    email: "",
    phone: "",
    roles: "driver",
    nameCompany: null,
  });

  // logic
  useEffect(() => {
    if (userData) {
      authContext?.setUser(userData);
      // setUser(userData);
      setFormData({
        userName: userData.userName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        roles: userData.roles || "driver",
        nameCompany: userData.companyPublicData?.nameCompany || null,
      });
    }
  }, [userData, authContext]);

  // handlers
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChangeForm(true);
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (phone: string) => {
    let rawValue = phone.replace(/\D/g, ""); // Оставляем только цифры

    if (rawValue.length > 11) rawValue = rawValue.slice(0, 11); // Ограничение длины

    return rawValue;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsChangeForm(false);

    if (formData.roles === "customer" && !formData.nameCompany) {
      return toast({
        title: "Ошибка валидации",
        description: "Введите название компании",
        variant: "destructive",
      });
    }

    const data = {
      userName: formData.userName,
      phone: handlePhoneChange(formData.phone),
      roles: formData.roles,
      nameCompany: formData.nameCompany || null,
    };

    console.log("Edit profile", data);
    updateProfileMutation.mutate(data, {
      onSuccess: (data: { message: string }) => {
        // console.log(data);
        toast({
          title: "Успешно",
          description: data?.message,
        });
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      },
    });
  };

  return {
    state: {
      isChangeForm,
      formData,
      userData,
      isLoading,
    },
    actions: {
      setIsChangeForm,
      setFormData,
      handleChange,
      handleSubmit,
    },
  };
}
