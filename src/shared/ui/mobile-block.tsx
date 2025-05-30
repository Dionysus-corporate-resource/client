export default function MobileBlock() {
  return (
    <div className="w-screen h-screen border flex flex-col  ex:p-6 sm:p-14 md:p-16">
      <span className="text-lg ex:text-base sm:text-xl md:text-2xl font-medium">
        Груз Рынок
      </span>
      <div className="flex-1 flex items-center justify-center ex:px-4 sm:px-14 md:px-20">
        <div className="flex flex-col ex:gap-2 gap-6">
          <h2 className="font-semibold md:font-semibold text-2xl md:text-3xl">
            Сервис не доступен на вашем устройстве
          </h2>
          <p className="md:font-normal md:text-2xl text-lg  mt-4">
            К сожалению, текущая версия сайта не поддерживает мобильные
            устройства. Для комфортной работы воспользуйтесь, пожалуйста,
            компьютером или ноутбуком с разрешением экрана от 1024px.
          </p>
          <p className="md:font-normal md:text-2xl text-lg">
            Мы планируем запуск мобильной версии — ваша активность поможет нам
            реализовать это быстрее!
          </p>
        </div>
      </div>
    </div>
  );
}
