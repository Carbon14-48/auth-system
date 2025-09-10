/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z, { email, string } from "zod";
function LoginForm() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "YourEmail@.com",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-100"
      >
        <label
          htmlFor="email"
          className="text-sm font-medium dark:text-white text-black"
        >
          Enter Your Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Email"
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white text-black placeholder:italic"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <label
          htmlFor="password"
          className="text-sm font-medium dark:text-white text-black"
        >
          Enter Your Password
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
          className="p-2 rounded border placeholder:italic border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white text-black"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <button
          type="submit"
          className="mt-2 p-2 rounded bg-cyan-600 text-white cursor-pointer hover:scale-103 hover:bg-cyan-700 transition"
        >
          Submit
        </button>
        <div className="flex justify-between items-center">
          <p>Don't have an Account?</p>
          <button
            onClick={() => navigate("/register")}
            className="bg-cyan-400 hover:scale-103 cursor-pointer rounded-full p-4 transition-all duration-400"
          >
            register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
