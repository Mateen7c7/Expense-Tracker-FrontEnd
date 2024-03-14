"use client";
import { useExpensesByMonth, useTodayExpenses } from "@/services/queries";
import { ExpenseType } from "@/types";
import { Moon } from "lucide-react";
import { LogOut } from "lucide-react";
export default function Home() {
  const expenseQuery = useTodayExpenses();
  const date = new Date();
  let month = `${date.getFullYear()}-${date.getMonth() + 1}`;
  const ThisMonthExpenseQuery = useExpensesByMonth(month);
  console.log(expenseQuery);
  if (expenseQuery.isLoading) {
    return <p>Loading...</p>;
  }
  if (expenseQuery.error) {
    return (
      <div>
        <p>Something went wrong</p>
        <p>{expenseQuery.error.toString()}</p>
      </div>
    );
  }
  console.log(expenseQuery.data);
  let totalAmount = 0;
  let todayAmount = 0;
  expenseQuery.data?.map((item) => {
    todayAmount = todayAmount + item.price;
  });
  if (ThisMonthExpenseQuery.data) {
    ThisMonthExpenseQuery.data?.map((item) => {
      totalAmount = totalAmount + item.price;
    });
  }
  return (
    <div className="h-full w-full ">
      <div className="between">
        <Moon className="cursor-pointer" />
        <p className="text-sm font-semibold">Expenses</p>
        <LogOut className="cursor-pointer" />
      </div>
      <div className="flex flex-col items-center gap-6 my-20">
        <p className="text-sm text-gray-500">Spent this month</p>
        <p className="text-red-500 text-5xl">
          {" "}
          <span>-</span> {totalAmount || 0} <span className="text-xl">$ </span>
        </p>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>Today</p>
        <p>- {todayAmount || 0} $</p>
      </div>
      <div className=" w-full h-[320px] overflow-y-scroll">
        <div className="space-y-2 mt-5 px-1">
          {expenseQuery.data!.map((item, i) => {
            return <Item obj={item} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Item({ obj }: { obj: ExpenseType }) {
  // function to convert date into string in am pm format

  let date = new Date(obj.date!);
  const dateString = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  console.log(date);
  // function to convert first letter to uppercase

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="between">
      <div>
        <p>{capitalizeFirstLetter(obj.title)}</p>
        <p className="text-sm text-gray-500">{dateString}</p>
      </div>
      <div>
        <p className="text-red-500">{`-${obj.price} $`}</p>
      </div>
    </div>
  );
}
