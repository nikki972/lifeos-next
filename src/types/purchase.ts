export const PURCHASE_CATEGORIES = [
  "apartment",
  "tech",
  "home",
  "car",
  "3d",
  "clothes",
  "rest",
  "other",
] as const;

export type PurchaseCategory =
  (typeof PURCHASE_CATEGORIES)[number];

export const PURCHASE_CATEGORY_LABELS: Record<
  PurchaseCategory,
  string
> = {
  apartment: "Квартира",
  tech: "Техника",
  home: "Дом",
  car: "Машина",
  "3d": "3D",
  clothes: "Одежда",
  rest: "Отдых",
  other: "Другое",
};

export const PURCHASE_PRIORITIES = [
  "low",
  "medium",
  "high",
] as const;

export type PurchasePriority =
  (typeof PURCHASE_PRIORITIES)[number];

export const PURCHASE_PRIORITY_LABELS: Record<
  PurchasePriority,
  string
> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

export const PURCHASE_STATUSES = [
  "active",
  "planned",
  "completed",
  "postponed",
  "cancelled",
] as const;

export type PurchaseStatus =
  (typeof PURCHASE_STATUSES)[number];

export const PURCHASE_STATUS_LABELS: Record<
  PurchaseStatus,
  string
> = {
  active: "В процессе",
  planned: "В планах",
  completed: "Куплено",
  postponed: "Отложено",
  cancelled: "Отменено",
};

export interface Purchase {
  id: string;
  user_id: string;
  title: string;
  price: number;
  category: PurchaseCategory;
  priority: PurchasePriority;
  status: PurchaseStatus;
  created_at: string;
  is_favorite: boolean;
}
