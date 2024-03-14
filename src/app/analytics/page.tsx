"use client";
import { useExpensesByMonth } from "@/services/queries";
import { MoveLeft } from "lucide-react";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";

interface Category {
  name: string;
  amount: number;
}
export default function Home() {
  const [date, setDate] = useState(new Date());
  const monthExpensesQuery = useExpensesByMonth(
    `${date.getFullYear()}-${date.getMonth() + 1}`
  );
  function convertDateToMonthString(date: Date) {
    return date.toLocaleString("en-US", { month: "long" });
  }
  function convertDateToYear(date: Date) {
    return date.getFullYear();
  }
  function addOneMonthToDate(date: Date) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  }
  function subOneMonthToDate(date: Date) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
  }
  function handleAdd() {
    setDate(addOneMonthToDate(date));
  }
  function handleSub() {
    setDate(subOneMonthToDate(date));
  }
  if (monthExpensesQuery.isLoading) {
    return <p>Loading...</p>;
  }
  if (monthExpensesQuery.error) {
    return <p>{monthExpensesQuery.error.toString()}</p>;
  }

  let totalAmount = 0;
  let needChart = {
    high: 0,
    medium: 0,
    low: 0,
  };
  let categoryChart: Category[] = [];
  monthExpensesQuery.data?.map((item) => {
    totalAmount = totalAmount + item.price;
    needChart[item.need] = needChart[item.need] + item.price;
    // if (!categoryChart.includes({ name: item.category, amount: item.price })) {
    //   categoryChart.push({ name: item.category, amount: item.price });
    // }
    if (!categoryChart.find((obj) => obj.name === item.category)) {
      categoryChart.push({ name: item.category, amount: item.price });
    } else {
      const index = categoryChart.findIndex(
        (obj) => obj.name === item.category
      );
      categoryChart[index].amount = categoryChart[index].amount + item.price;
    }
  });
  console.log("category", categoryChart);
  console.log(monthExpensesQuery.data);
  console.log(needChart);

  return (
    <div>
      <div className="flex items-center justify-end">
        <Link href="/">
          <LogOut size={20} className="cursor-pointer" />
        </Link>
      </div>
      <div className="flex items-center justify-between mt-5">
        <MoveLeft onClick={handleSub} size={30} className="cursor-pointer" />
        <div className="flex items-center flex-col">
          <p className="text-2xl">{convertDateToMonthString(date)}</p>
          <p className="text-sm text-gray-500">{convertDateToYear(date)}</p>
        </div>
        <MoveRight onClick={handleAdd} size={30} className="cursor-pointer" />
      </div>
      {monthExpensesQuery.data?.length == 0 ? (
        <div className="center ">
          <p className="text-2xl my-5 bg-red-500 text-white font-bold px-2 py-1 rounded-md">
            No data
          </p>
        </div>
      ) : (
        <div className="overflow-y-auto  h-[550px]">
          <div className="center my-5">
            <p className="text-2xl">
              Total Spent :{" "}
              <span className="text-red-500">{`- ${totalAmount} $`}</span>
            </p>
          </div>
          <PieChart datas={needChart} />
          <BarChart categoryChart={categoryChart} />
        </div>
      )}
    </div>
  );
}
