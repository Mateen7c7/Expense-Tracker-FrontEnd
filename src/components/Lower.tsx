"use client";
import { useCreateExpense } from "@/services/mutations";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
import { AreaChart } from "lucide-react";
import { Pen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  title: string;
  price: number;
  category: string;
  need: "high" | "medium" | "low";
}
function Lower() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-t border-gray-400 h-14 flex items-center justify-between px-6">
      <div className="cursor-pointer ">
        <Link href={"/analytics"} className="flex flex-col items-center gap-1">
          <AreaChart />
          <p className="text-[12px] text-gray-700">Analytics</p>
        </Link>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="bg-yellow-300 rounded-full h-[40px] w-[40px] center cursor-pointer"
      >
        <Plus size={30} />
      </div>
      <div className="cursor-pointer">
        <Link href={"/analytics"} className="flex flex-col items-center gap-1">
          <Pen />
          <p className="text-[12px] text-gray-700">Change</p>
        </Link>
      </div>
      {open && (
        <div className="w-full h-full backdrop-blur-md absolute top-0 left-0 center">
          <Form setOpen={setOpen} />
        </div>
      )}
    </nav>
  );
}
function Form({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean> | boolean>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const createExpense = useCreateExpense();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    createExpense.mutate({ ...data, price: Math.abs(data.price) });
    console.log(createExpense);
    setOpen(false);
  };
  return (
    <div className="">
      <div className="absolute top-10 right-10">
        <X
          size={30}
          onClick={() => setOpen(false)}
          className="cursor-pointer text-red-500"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1  p-2 bg-yellow-200 rounded-md"
      >
        <label>Title</label>
        <input
          {...register("title", {
            required: "Title is required",
            maxLength: 20,
          })}
          type="text"
          className="input"
        ></input>
        {errors.title && (
          <div className="text-red-500">{errors.title.message}</div>
        )}
        <label>Price</label>
        <input
          className="input"
          {...register("price", { required: "Price is required", min: 0 })}
          type="number"
        ></input>
        {errors.price && (
          <div className="text-red-500">{errors.price.message}</div>
        )}
        <label>Category</label>
        <input
          className="input"
          type="text"
          {...register("category", {
            required: "Category is required",
            maxLength: 20,
          })}
        ></input>
        {errors.category && (
          <div className="text-red-500">{errors.category.message}</div>
        )}
        <label>Need</label>
        <select
          defaultValue={"high"}
          {...register("need")}
          className="bg-white p-1 input"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>{" "}
        <div className="center mt-5">
          <input
            value={"Add"}
            type="submit"
            className=" bg-green-400 text-white font-bold py-1 px-2 rounded-sm cursor-pointer"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

export default Lower;
