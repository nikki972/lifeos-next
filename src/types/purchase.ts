export type PurchaseCategory =
  | "apartment"
  | "car"
  | "3d"
  | "clothes"
  | "rest";

export type PurchasePriority =
  | "urgent"
  | "wait"
  | "wish";

export type PurchaseStatus =
  | "planned"
  | "completed";

export interface Purchase {
  id: string;

  title: string;

  price: number;

  category: PurchaseCategory;

  priority: PurchasePriority;

  status: PurchaseStatus;

  createdAt: string;

  isFavorite: boolean;
}