/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithubSquare } from "react-icons/fa";
import axios from "axios";
import { useToken } from "../customHooks/TokenProvider";
import { useId } from "../customHooks/IdProvider";
function LoginForm() {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const { id, setId } = useId();
  const schema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    axios
      .post("http://localhost:8080/auth/login", data)
      .then((res) => {
        setId(res.data.id);
        setToken(res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.response?.data?.error || "login failed");
      });
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubAuth = () => {
    console.log("Github auth clicked");
  };

  return (
    <div className="self-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-96"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Username:
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="w-full bg-slate-300 dark:bg-gray-700 dark:text-white p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-[36px]"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Password:
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="w-full bg-slate-300 dark:bg-gray-700 dark:text-white p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-[36px]"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 p-3 rounded bg-cyan-600 text-white font-medium hover:scale-[1.02] hover:bg-cyan-700 transition-all duration-200 h-12"
        >
          Sign In
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 dark:text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className="p-3 rounded bg-cyan-600 text-white hover:scale-[1.02] hover:bg-cyan-700 transition-all duration-200 flex justify-between items-center h-12"
        >
          <span>Continue With Google</span>
          <FcGoogle className="w-[24px] h-[24px]" />
        </button>

        <button
          type="button"
          onClick={handleGithubAuth}
          className="p-3 rounded bg-cyan-600 text-white hover:scale-[1.02] hover:bg-cyan-700 transition-all duration-200 flex justify-between items-center h-12"
        >
          <span>Continue With Github</span>
          <FaGithubSquare className="w-[24px] h-[24px]" />
        </button>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
          <p className="text-sm dark:text-white">Don't have an Account?</p>
          <button
            type="button"
            onClick={() => navigate("/auth/register")}
            className="bg-cyan-400 hover:scale-[1.02] text-white font-medium rounded-full px-6 py-2 transition-all duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
