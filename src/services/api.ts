import { ExpenseType } from "@/types";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({ baseURL: "http://192.168.0.115:3000" });

// Post expense
export const createExpense = async (data: ExpenseType) => {
  const response: AxiosResponse = await axiosInstance.post("/expense", data);
  const responseData: ExpenseType = response.data;
  return responseData;
};

// get today's expenses

export const getTodayExpenses = async () => {
  const response: AxiosResponse = await axiosInstance.get("/analysis/today");
  const responseData: ExpenseType[] = response.data;
  return responseData;
};

// get expenses by month
export const getExpensesByMonth = async (month: string) => {
  const response: AxiosResponse = await axiosInstance.get(`/analysis/${month}`);
  const responseData: ExpenseType[] = response.data;
  return responseData;
};
