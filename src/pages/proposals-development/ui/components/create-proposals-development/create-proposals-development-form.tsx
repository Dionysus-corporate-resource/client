import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IProposalDevelopment } from "@/shared/model/types/proposals-development";
import { useMutation } from "@tanstack/react-query";
import { proposalsDevelopmentApi } from "@/pages/proposals-development/api/proposals-development-api";
import { queryClient } from "@/shared/api/query-client";
import { toast } from "@/hooks/use-toast";

export default function CreateProposalsDevelopmentForm() {
  const createProposalsDevelopment = useMutation({
    mutationFn: (data: IProposalDevelopment) =>
      proposalsDevelopmentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals-development"] });
    },
  });

  const [formData, setFormData] = useState<IProposalDevelopment>({
    name: "",
    description: "",
    topic: "proposals",
    status: "pending",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки данных на сервер
    console.log(formData);
    createProposalsDevelopment.mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Форма отправлена",
          description: "Данные о грузе успешно сохранены.",
        });
        queryClient.invalidateQueries({ queryKey: ["booking"] });
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ["booking"] });
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить данные о грузе.",
        });
      },
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl flex-col justify-between h-fit">
      <CardHeader>
        <CardTitle>Создать предложение</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
              placeholder="Введите название предложения"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <p className="text-sm text-muted-foreground">
              Кратко опишите суть вашего предложения
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Подробно опишите ваше предложение"
              className="min-h-[120px]"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
            <p className="text-sm text-muted-foreground">
              Опишите подробно, что вы хотите предложить или какую проблему
              обнаружили
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Тип</Label>
            <Select
              value={formData.topic}
              onValueChange={(value: "bag" | "proposals") =>
                setFormData({ ...formData, topic: value })
              }
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proposals">Предложение</SelectItem>
                <SelectItem value="bag">Ошибка</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Выберите тип вашего обращения
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Отмена
            </Button>
            <Button type="submit">Создать</Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
