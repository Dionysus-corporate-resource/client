import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { paymentApi, TTypeSubscripe } from "./paymentApi";
import { useAuth } from "@/app/providers/auth-provider";
import { useNavigate } from "react-router";

export default function SubscribePage() {
  const { token } = useAuth();

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex flex-col gap-16">
        <div className="flex gap-2 flex-col items-center justify-center">
          <h4 className="font-semibold text-3xl text-center max-w-xl w-full">
            Выберите подходящий тариф
          </h4>
          <span className="font-normal text-base text-center max-w-3xl w-full">
            «Перед оплатой ознакомьтесь с{" "}
            <a
              href="https://docs.google.com/document/d/1UxzUhPxwIFXjyX0ufn7wfewNSb0lnWuU7DAqKyARZxU/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              публичной офертой
            </a>{" "}
            и{" "}
            <a
              href="https://docs.google.com/document/d/1KT599uyijO9sGzPTbtelYpP8ELLcewmspw7amGwHsEI/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              пользовательским соглашением
            </a>
            . Платежи обрабатываются через защищенный сервис QKassa».
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full px-6">
          <SubscribeCardOne token={token} />
          <SubscribeCardTwo token={token} />
          <SubscribeCardThree token={token} />
        </div>
      </div>
    </div>
  );
}

function SubscribeCardOne({ token }: { token: string | null }) {
  const navigate = useNavigate();
  const [countB, setCountB] = useState(1);
  const incBooking = () => {
    setCountB((prev) => prev + 1);
  };
  const decrBooking = () => {
    setCountB((prev) => Math.max(0, prev - 1));
  };

  const handlePayment = () => {
    if (!token) {
      return navigate("/login");
    }
    const data = {
      priceOneBooking: 100,
      countBooking: countB,
    };
    paymentApi.createPurchase(data);
  };
  return (
    <div className="border rounded-[30px] p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">Поштучные заявки</span>
        <span className="text-xs font-normal">
          Хороший вариант, чтобы попробовать
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-normal text-4xl">{countB * 100}₽</span>
            <span className="font-normal text-base text-primary/80">
              / {countB}шт
            </span>
          </div>
          <span className="font-normal text-xs text-primary/60">
            Без экономии
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={incBooking}
            className="rounded-[30px] p-4 bg-primary/5"
          >
            <PlusIcon />
          </button>
          <button
            onClick={decrBooking}
            className="rounded-[30px] p-4 bg-primary/5"
          >
            <MinusIcon />
          </button>
        </div>
      </div>

      <button
        onClick={() => handlePayment()}
        className="w-full rounded-[30px] px-6 py-4 font-semibold text-base text-white
        bg-gradient-to-r from-[#141414] via-[#5F5F5F] to-[#141414]
        border border-[#ffffff30]
        shadow-[0_4px_15px_rgba(255,255,255,0.2)]
        hover:brightness-110
        transition-all
        active:scale-95
        active:brightness-90
        relative
        overflow-hidden
        before:content-['']
        before:absolute
        before:inset-0
        before:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.3)_50%,transparent_90%)]
        before:opacity-0
        hover:before:opacity-100
        before:transition-opacity
        before:duration-300"
      >
        Купить {countB > 0 && <>{countB}шт</>}
      </button>
    </div>
  );
}

function SubscribeCardTwo({ token }: { token: string | null }) {
  const navigate = useNavigate();
  const handlePayment = () => {
    if (!token) {
      return navigate("/login");
    }
    const data = {
      priceOneBooking: 100,
      countBooking: 27,
    };
    paymentApi.createPurchase(data);
  };
  return (
    <div className="border rounded-[30px] p-6 flex flex-col gap-8 h-fit">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">Выгодный пакет заявок</span>
        <span className="text-xs font-normal">
          Бери набор со скидкой, дешевле чем покупать поштучно
        </span>
      </div>
      <div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-normal text-4xl">2700₽</span>
            <span className="font-normal text-base text-primary/80">
              / 30шт
            </span>
          </div>
          <span className="font-normal text-xs text-primary/60">
            Экономите 10%
          </span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full rounded-[30px] px-6 py-4 font-semibold text-base text-white
        bg-gradient-to-r from-[#141414] via-[#5F5F5F] to-[#141414]
        border border-[#ffffff30]
        shadow-[0_4px_15px_rgba(255,255,255,0.2)]
        hover:brightness-110
        transition-all
        active:scale-95
        active:brightness-90
        relative
        overflow-hidden
        before:content-['']
        before:absolute
        before:inset-0
        before:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.3)_50%,transparent_90%)]
        before:opacity-0
        hover:before:opacity-100
        before:transition-opacity
        before:duration-300"
      >
        Заказать пакет
      </button>
    </div>
  );
}

function SubscribeCardThree({ token }: { token: string | null }) {
  const navigate = useNavigate();
  const handlePayment = () => {
    if (!token) {
      return navigate("/login");
    }
    const data = {
      typeSubscriprion: "unLimited" as TTypeSubscripe,
      countMonthSubscribe: 1,
    };
    paymentApi.createUnlimitSubscription(data);
  };
  return (
    <div className="border rounded-[30px] p-6 flex flex-col gap-8 h-fit">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">Месячная подписка</span>
        <span className="text-xs font-normal">Неограниченное число заявок</span>
      </div>
      <div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-normal text-4xl">3500₽</span>
            <span className="font-normal text-base text-primary/80">
              / мес.
            </span>
          </div>
          <span className="font-normal text-xs text-primary/60">
            Популярный выбор
          </span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full rounded-[30px] px-6 py-4 font-semibold text-base text-white
        bg-gradient-to-r from-[#141414] via-[#5F5F5F] to-[#141414]
        border border-[#ffffff30]
        shadow-[0_4px_15px_rgba(255,255,255,0.2)]
        hover:brightness-110
        transition-all
        active:scale-95
        active:brightness-90
        relative
        overflow-hidden
        before:content-['']
        before:absolute
        before:inset-0
        before:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.3)_50%,transparent_90%)]
        before:opacity-0
        hover:before:opacity-100
        before:transition-opacity
        before:duration-300"
      >
        Оформить подписку
      </button>
    </div>
  );
}
