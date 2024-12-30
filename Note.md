1. border-[hsl(var(--border))]
Для темной темы, нужно дописывать это в компоненты
2. bg-[hsl(var(--sidebar-background))]
Это для фона в темной теме

// еслия я правильно понял, она найдет все рейсы из каждой заявки, конкретного диспетчера
 const sortFlight = bookingData?.flatMap((corporateBooking) => {
    return corporateBooking.flight.filter(
      (flight) => flight.dispatcher === context?.user?.userData?._id,
    );
  });

  const context = useAuth();
  const { data: bookingData } = useQuery(bookingQueryOptions.getAll());
  const [sortBookingId, setSortBookingId] = useState<string | null>(null);

  const sortFlight = bookingData
    ?.find((booking) => booking._id === sortBookingId)
    ?.flight.filter(
      (flight) => flight.dispatcher === context?.user?.userData?._id,
    );
