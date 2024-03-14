import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "./api";
import { ExpenseType } from "@/types";

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExpenseType) => {
      return createExpense(data);
    },
    onSettled: async (_, error) => {
      const date = new Date();
      let month = `${date.getFullYear()}-${date.getMonth() + 1}`;
      console.log("Settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todayExpenses"] });
        await queryClient.invalidateQueries({
          queryKey: ["expensesByMonth", { month }],
        });
      }
    },
  });
}
