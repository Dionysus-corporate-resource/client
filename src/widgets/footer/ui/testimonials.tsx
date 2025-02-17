import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Отзывы наших клиентов
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Более 10,000 компаний уже доверяют нам свои грузоперевозки
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-slate-600">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    avatar: "/placeholder.svg?height=100&width=100",
    name: "Анна Смирнова",
    role: "Логист, ООО «ТрансЛогистика»",
    rating: 5,
    quote:
      "Платформа полностью изменила наш подход к организации перевозок. Теперь мы экономим до 30% времени на поиск перевозчиков и оформление документов.",
  },
  {
    avatar: "/placeholder.svg?height=100&width=100",
    name: "Иван Петров",
    role: "Директор, ИП Петров",
    rating: 5,
    quote:
      "Как перевозчик, я очень доволен платформой. Удобный поиск заказов, быстрые выплаты и отличная поддержка. Теперь все мои машины загружены на 100%.",
  },
  {
    avatar: "/placeholder.svg?height=100&width=100",
    name: "Мария Иванова",
    role: "Менеджер, АО «Фрутлайн»",
    rating: 5,
    quote:
      "Прозрачность и безопасность сделок - главное, что привлекло нас в этой платформе. За год работы не было ни одного срыва поставок.",
  },
];
