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
      name: "Поштучная заявка",
      priceMonthly: "100 ",
      priceMonthlyDopInfo: "₽/(1 шт)",
      // priceYearly: "2400",
      priceYearlyDopInfo: "экономия 0%",
      description: "Идеально подходит для первого раза",
      popular: false,
      features: {
        "Основные функции": [
          {
            mainFeature: "Активная заявка",
            descriptionFeature:
              "Удобно и эффективно управлять вашими заявками — добавляйте, отслеживайте и контролируйте каждую заявку в реальном времени.",
          },
          {
            mainFeature: "Уникальное отображение на карте",
            descriptionFeature:
              "Все ваши заявки становятся видимыми на карте, что позволяет перевозчикам быстро находить их.",
          },
          {
            mainFeature: "Личный кабинет",
            descriptionFeature:
              "Просматривайте подробную статистику о заявках, следите за количеством просмотров и вовлечённостью. Удобный интерфейс позволяет легко редактировать или архивировать заявки, чтобы всегда иметь под рукой актуальную информацию.",
          },
        ],
      },
      highlight: "Начните работу прямо сейчас",
      freeUse: "Получи 10 заявок бесплатно, напиши в телеграмм - @frontMor",
    },
    {
      name: "Пакет заявок",
      priceMonthly: "2400",
      priceMonthlyDopInfo: "₽/(30 шт)",
      // priceYearly: "2400",
      priceYearlyDopInfo: "экономия 20%",
      description: "Когда доверяете нам, и можете сэкономить",
      popular: true,
      features: {
        "Уникальные функции": [
          {
            mainFeature: "Активные заявки - 30 шт",
            descriptionFeature:
              "Удобно и эффективно управлять вашими заявками — добавляйте, отслеживайте и контролируйте каждую заявку в реальном времени.",
          },
          {
            mainFeature: "Доступ к контактам",
            descriptionFeature: "Можете выидеть контакты других заказчиков",
          },
        ],
        "Основные функции": [
          {
            mainFeature: "Уникальное отображение на карте",
            descriptionFeature:
              "Все ваши заявки становятся видимыми на карте, что позволяет перевозчикам быстро находить их.",
          },
          {
            mainFeature: "Личный кабинет",
            descriptionFeature:
              "Просматривайте подробную статистику о заявках, следите за количеством просмотров и вовлечённостью. Удобный интерфейс позволяет легко редактировать или архивировать заявки, чтобы всегда иметь под рукой актуальную информацию.",
          },
        ],
      },
      highlight: "Продолжайте выкладывать",
      freeUse: "Получи + 15 заявок, напиши в телеграмм - @frontMor",
    },
    {
      name: "Безлимит заявок",
      priceMonthly: "6000",
      priceMonthlyDopInfo: "₽/мес",
      // priceYearly: "2400",
      priceYearlyDopInfo: "экономия от 40%",
      description: "Используйте свои силы на максимум",
      popular: false,
      features: {
        "Уникальные функции": [
          {
            mainFeature: "Не ограниченные заявки",
            descriptionFeature:
              "Удобно и эффективно управлять вашими заявками — добавляйте, отслеживайте и контролируйте каждую заявку в реальном времени.",
          },
          {
            mainFeature: "Доступ к контактам",
            descriptionFeature: "Можете выидеть контакты других заказчиков",
          },
          // {
          //   mainFeature: "Доступ к базе перевозчиков",
          //   descriptionFeature: "Можете выидеть контакты других заказчиков",
          // },
        ],
        "Основные функции": [
          {
            mainFeature: "Уникальное отображение на карте",
            descriptionFeature:
              "Все ваши заявки становятся видимыми на карте, что позволяет перевозчикам быстро находить их.",
          },
          {
            mainFeature: "Личный кабинет",
            descriptionFeature:
              "Просматривайте подробную статистику о заявках, следите за количеством просмотров и вовлечённостью. Удобный интерфейс позволяет легко редактировать или архивировать заявки, чтобы всегда иметь под рукой актуальную информацию.",
          },
        ],
      },
      highlight: "Не останавливайтесь",
      freeUse: "Получи 2 месяца безлимита, напиши в телеграмм - @frontMor",
    },
    // {
    //   name: "Профессиональный",
    //   priceMonthly: "2490",
    //   priceYearly: "24900",
    //   description: "Оптимальный выбор для растущего бизнеса",
    //   popular: true,
    //   features: {
    //     "Основные функции": [
    //       "До 50 активных заявок",
    //       "Расширенная статистика",
    //       "Приоритетная поддержка",
    //       "Уведомления в Telegram",
    //     ],
    //     Интеграции: ["Расширенный API доступ", "Интеграция с 1С"],
    //   },
    //   highlight: "Самый популярный выбор",
    // },
    // {
    //   name: "Корпоративный",
    //   priceMonthly: "4990",
    //   priceYearly: "49900",
    //   description: "Максимальные возможности для крупных компаний",
    //   popular: false,
    //   features: {
    //     "Основные функции": [
    //       "Неограниченное количество заявок",
    //       "Поддержка 24/7",
    //       "White label решение",
    //     ],
    //     Интеграции: ["Полный API доступ", "Индивидуальные доработки"],
    //   },
    //   highlight: "Максимум возможностей",
    // },
  ];
  const subscriptionsForDriver: IPlan[] = [
    {
      name: "Просмотр контактов",
      priceMonthly: "100",
      priceMonthlyDopInfo: "₽/месяц",
      // priceYearly: "2400",
      // priceYearlyDopInfo: "экономия 0%",
      // description: "Идеально подходит для первого раза",
      popular: false,
      features: {
        "Основные функции": [
          {
            mainFeature: "Просмотр всех контактов заказчиков",
            descriptionFeature:
              "Удобно и эффективно управлять вашими заявками — добавляйте, отслеживайте и контролируйте каждую заявку в реальном времени.",
          },
          {
            mainFeature: "Личный кабинет",
            descriptionFeature:
              "Просматривайте подробную статистику о заявках, следите за количеством просмотров и вовлечённостью. Удобный интерфейс позволяет легко редактировать или архивировать заявки, чтобы всегда иметь под рукой актуальную информацию.",
          },
        ],
      },
      highlight: "Найди погрузку прямо сейчас",
      freeUse:
        "Получи 3 месяца просмотра контактов бесплатно, следуя нашей акции, напиши в телеграмм - @frontMor",
    },
    {
      name: "Просмотр контактов",
      priceMonthly: "250",
      priceMonthlyDopInfo: "₽/ 3 месяца",
      // priceYearly: "2400",
      priceYearlyDopInfo: "экономия 15%",
      // description: "Идеально подходит для первого раза",
      popular: false,
      features: {
        "Основные функции": [
          {
            mainFeature: "Просмотр всех контактов заказчиков",
            descriptionFeature:
              "Удобно и эффективно управлять вашими заявками — добавляйте, отслеживайте и контролируйте каждую заявку в реальном времени.",
          },
          {
            mainFeature: "Личный кабинет",
            descriptionFeature:
              "Просматривайте подробную статистику о заявках, следите за количеством просмотров и вовлечённостью. Удобный интерфейс позволяет легко редактировать или архивировать заявки, чтобы всегда иметь под рукой актуальную информацию.",
          },
        ],
      },
      highlight: "Найди погрузку прямо сейчас",
      freeUse:
        "Получи 3 месяца просмотра контактов бесплатно, следуя нашей акции, напиши в телеграмм - @frontMor",
    },
  ];

  return (
    <div className="mx-auto flex flex-1 md:grid md:grid-cols-1 lg:grid-cols-1 gap-6 p-4 md:p-6">
      <div className="h-full overflow-y-auto no-scrollbar">
        <Tabs
          defaultValue={userData?.roles ?? "driver"}
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
