export interface Purchase {
  id: string;

  title: string;

  price: number;

  createdAt: string;

  isFavorite: boolean;

  status:
    | "planned"
    | "completed";
}