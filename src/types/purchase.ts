import { Category } from "./category";

export type PurchasePriority =
  | "urgent"
  | "wait"
  | "wish";

export type PurchaseStatus =
  | "planned"
  | "completed"
  | "postponed"
  | "cancelled";

export interface Purchase {
  id: string;

  title: string;

  price: number;

  category: Category;

  priority: PurchasePriority;

  status: PurchaseStatus;

  notes?: string;

  url?: string;

  store?: string;

  tags: string[];

  isFavorite: boolean;

  createdAt: string;
}