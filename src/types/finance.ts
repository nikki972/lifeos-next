export const TRANSACTION_TYPES = [
  "income",
  "expense",
] as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[number];

export const TRANSACTION_TYPE_LABELS: Record<
  TransactionType,
  string
> = {
  income: "Доход",
  expense: "Расход",
};

export const TRANSACTION_CATEGORIES = [
  "salary",
  "food",
  "transport",
  "home",
  "health",
  "subscriptions",
  "shopping",
  "other",
] as const;

export type TransactionCategory =
  (typeof TRANSACTION_CATEGORIES)[number];

export const TRANSACTION_CATEGORY_LABELS: Record<
  TransactionCategory,
  string
> = {
  salary: "Зарплата",
  food: "Еда",
  transport: "Транспорт",
  home: "Дом",
  health: "Здоровье",
  subscriptions: "Подписки",
  shopping: "Покупки",
  other: "Другое",
};

export interface Transaction {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  created_at: string;
}
