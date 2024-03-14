import { useQuery } from "@tanstack/react-query";
import { getExpensesByMonth, getTodayExpenses } from "./api";

export function useTodayExpenses() {
  return useQuery({
    queryKey: ["todayExpenses"],
    queryFn: () => getTodayExpenses(),
  });
}

export function useExpensesByMonth(month: string) {
  return useQuery({
    queryKey: ["expensesByMonth", {month}],
    queryFn: () => getExpensesByMonth(month),
  });
}
