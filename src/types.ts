export interface ExpenseType {
  title: string;
  price: number;
  date?: Date;
  category: string;
  need: "high" | "medium" | "low";
}
