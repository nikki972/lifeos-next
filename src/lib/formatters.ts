export const moneyFormatter =
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

export function formatMoney(
  value: number
) {
  return moneyFormatter.format(value);
}

export function formatShortDate(
  value: string
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(date);
}
