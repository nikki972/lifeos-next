export interface Transaction {
  id: string;

  title: string;

  amount: number;

  type: "income" | "expense";

  category: string;

  createdAt: string;
}