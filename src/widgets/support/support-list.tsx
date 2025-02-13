import { useState } from "react";
import { CodeXml, ServerCrash } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";

interface FeedbackItem {
  id: string;
  name: string;
  description: string;
  topic: "bag" | "proposals";
  status: "in-progress" | "pending" | "rejected";
}

// This would typically come from your API
const MOCK_FEEDBACK: FeedbackItem[] = [
  {
    id: "1",
    name: "Добавить чат с поддержкой",
    description: "Нехватает чата с поддержкой",
    topic: "proposals",
    status: "in-progress",
  },
  {
    id: "2",
    name: "Не отображается страница с профилем",
    description:
      "Если вы нашли баг или у вас есть предложение по добавлению нового функционала, можете добавить их здесь",
    topic: "bag",
    status: "pending",
  },
  {
    id: "3",
    name: "Не отображается страница с профилем",
    description:
      "Если вы нашли баг или у вас есть предложение по добавлению нового функционала, можете добавить их здесь",
    topic: "proposals",
    status: "rejected",
  },
];

export default function FeedbackList() {
  const [filter, setFilter] = useState<string>("all");

  const filteredFeedback = MOCK_FEEDBACK.filter((item) =>
    filter === "all" ? true : item.topic === filter,
  );

  return (
    <div className="h-[calc(100vh-80px)] p-6 pr-4 col-span-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div></div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Отображать все типы</SelectItem>
              <SelectItem value="proposals">
                Предложения по разработке
              </SelectItem>
              <SelectItem value="bag">Ошибки на сайте</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 max-h-[calc(100%-36px)] overflow-y-auto pr-4">
        {filteredFeedback.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "relative shadow-none border-none bg-muted",

              // item.topic === "bag" ? "bg-red-50" : "bg-green-50",
            )}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                {item.topic === "bag" ? (
                  <ServerCrash className="h-6 w-6 text-re-500 mx-3" />
                ) : (
                  <CodeXml className="h-6 w-6 text-gree-500 mx-3" />
                )}
                <div className="flex flex-col gap-1">
                  <CardTitle className="font-medium text-lg">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/60">
                    {item.topic === "bag"
                      ? "Ошибка на сайте"
                      : "Предложения по разработке"}
                    <StatusBadge status={item.status} />
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-normal text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No feedback items found</p>
        </div>
      )}
    </div>
  );
}

interface StatusBadgeProps {
  status: "in-progress" | "pending" | "rejected";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "absolute top-4 right-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "in-progress" && "bg-blue-100 text-blue-700",
        status === "pending" && "bg-yellow-100 text-yellow-700",
        status === "rejected" && "bg-red-100 text-red-700",
      )}
    >
      {status === "in-progress" && "В работе"}
      {status === "pending" && "На рассмотрении"}
      {status === "rejected" && "Отклонено"}
    </span>
  );
}
