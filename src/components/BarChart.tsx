import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from 'faker';
// declare module 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Category Chart",
    },
  },
};


interface Category {
  name: string;
  amount: number;
}
export default function BarChart({
  categoryChart,
}: {
  categoryChart: Category[];
}) {
  const labels = categoryChart.map((item) => item.name);
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: categoryChart.map((item) => item.amount),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
