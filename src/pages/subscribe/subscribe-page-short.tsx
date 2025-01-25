import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import SubscripeList from "@/widgets/subscripe-list/subscripe-list";
import { IPlan } from "@/entities/subscribe/ui/subscripe-card";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { useAtomValue } from "jotai";

export default function SubscriptionsPageShort() {
  const userData = useAtomValue(userStorageAtom);
  const subscriptionsForCustomer: IPlan[] = [
    {
      name: "Базовый",
      priceMonthly: "990",
      priceYearly: "9900",
      description:
        "Идеально подходит для небольших компаний и индивидуальных перевозчиков",
      popular: false,
      features: {
        "Основные функции": ["До 10 активных заявок", "Email поддержка"],
        Интеграции: ["Базовый API доступ", "Экспорт в Excel"],
      },
      highlight: "Начните работу прямо сейчас",
    },
    {
      name: "Профессиональный",
      priceMonthly: "2490",
      priceYearly: "24900",
      description: "Оптимальный выбор для растущего бизнеса",
      popular: true,
      features: {
        "Основные функции": [
          "До 50 активных заявок",
          "Расширенная статистика",
          "Приоритетная поддержка",
          "Уведомления в Telegram",
        ],
        Интеграции: ["Расширенный API доступ", "Интеграция с 1С"],
      },
      highlight: "Самый популярный выбор",
    },
    {
      name: "Корпоративный",
      priceMonthly: "4990",
      priceYearly: "49900",
      description: "Максимальные возможности для крупных компаний",
      popular: false,
      features: {
        "Основные функции": [
          "Неограниченное количество заявок",
          "Поддержка 24/7",
          "White label решение",
        ],
        Интеграции: ["Полный API доступ", "Индивидуальные доработки"],
      },
      highlight: "Максимум возможностей",
    },
  ];
  const subscriptionsForDriver: IPlan[] = [
    {
      name: "Базовый",
      priceMonthly: "990",
      priceYearly: "9900",
      description:
        "Идеально подходит для небольших компаний и индивидуальных перевозчиков",
      popular: false,
      features: {
        "Основные функции": ["До 10 активных заявок", "Email поддержка"],
        Интеграции: ["Базовый API доступ", "Экспорт в Excel"],
      },
      highlight: "Начните работу прямо сейчас",
    },
    {
      name: "Профессиональный",
      priceMonthly: "2490",
      priceYearly: "24900",
      description: "Оптимальный выбор для растущего бизнеса",
      popular: true,
      features: {
        "Основные функции": [
          "До 50 активных заявок",
          "Расширенная статистика",
          "Приоритетная поддержка",
          "Уведомления в Telegram",
        ],
        Интеграции: ["Расширенный API доступ", "Интеграция с 1С"],
      },
      highlight: "Самый популярный выбор",
    },
    {
      name: "Корпоративный",
      priceMonthly: "4990",
      priceYearly: "49900",
      description: "Максимальные возможности для крупных компаний",
      popular: false,
      features: {
        "Основные функции": [
          "Неограниченное количество заявок",
          "Поддержка 24/7",
          "White label решение",
        ],
        Интеграции: ["Полный API доступ", "Индивидуальные доработки"],
      },
      highlight: "Максимум возможностей",
    },
  ];

  return (
    <div className="mx-auto flex flex-1 md:grid md:grid-cols-1 lg:grid-cols-1 gap-6 p-4 md:p-6">
      <div className="h-full overflow-y-auto no-scrollbar">
        <Tabs
          defaultValue={userData?.roles}
          className="overflow-hidden space-y-4 overflow-y-auto no-scrollbar"
        >
          <div className="flex gap-6 justify-between">
            <TabsList>
              <TabsTrigger value="customer" className="space-x-2">
                {/* <List className="w-4 h-4" /> */}
                <span>Для заказчика</span>
              </TabsTrigger>
              <TabsTrigger value="driver" className="space-x-2">
                {/* <MapPinned className="w-4 h-4" /> */}
                <span>Для перевозчика</span>
              </TabsTrigger>
            </TabsList>
          </div>
          {/* Content */}
          <TabsContent value="customer" className="h-full">
            <div className="container mx-auto flex justify-center items-center py-10 space-y-16">
              <SubscripeList subscriptions={subscriptionsForCustomer} />
            </div>
          </TabsContent>
          <TabsContent value="driver">
            <div className="container mx-auto flex justify-center items-center py-10 space-y-16">
              <SubscripeList subscriptions={subscriptionsForDriver} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
