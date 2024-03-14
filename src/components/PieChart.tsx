"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
  high: number;
  low: number;
  medium: number;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ datas }: { datas: PieChartProps }) {
  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "$ Spent",
        data: [datas.high, datas.medium, datas.low],
        // data: [12, 19, 4],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
        <div className="center my-3 text-2xl font-semibold ">
            <p>Need Chart</p>
        </div>
      <Pie data={data} />
    </div>
  );
}
