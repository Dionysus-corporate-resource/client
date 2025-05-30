export default function useFormatters() {
  const formatPhoneNumber = (phone: string) => {
    return phone?.replace(
      /^(8|7)(\d{3})(\d{3})(\d{2})(\d{2})$/,
      "+7 ($2) $3-$4-$5",
    );
  };
  const formatPhoneGpt = (rawPhone: string) => {
    if (!rawPhone) return "";

    const digits = rawPhone.replace(/\D/g, "");
    let formatted = "+7 ";

    if (digits.length > 1) formatted += `(${digits.substring(1, 4)}`;
    if (digits.length > 4) formatted += `) ${digits.substring(4, 7)}`;
    if (digits.length > 7) formatted += `-${digits.substring(7, 9)}`;
    if (digits.length > 9) formatted += `-${digits.substring(9, 11)}`;

    return formatted;
  };
  return { formatPhoneNumber, formatPhoneGpt };
}
