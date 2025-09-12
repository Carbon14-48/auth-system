/* eslint-disable no-unused-vars */
import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithubSquare } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToken } from "../customHooks/TokenProvider";
import { useId } from "../customHooks/IdProvider";
import axios from "axios";
function RegisterForm() {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const { id, setId } = useId();
  const schema = z
    .object({
      email: z.email("Please enter a valid email address"),
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be at most 20 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message:
            "Username can only contain letters, numbers, and underscores",
        }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
        .regex(/[^A-Za-z0-9]/, {
          message: "Password must contain at least one special character",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...rest } = data;
    const dataToSend = { ...rest, creationDate: new Date().toISOString() };
    axios
      .post("http://localhost:8080/auth/register", dataToSend)
      .then((res) => {
        console.log("Registration success:", res.data);
        try {
          setToken(res.data.token);
          console.log("Set token done");
          setId(res.data.id);
          console.log("Set id done");
          navigate("/dashboard");
          console.log("Navigate done");
        } catch (err) {
          console.error("Error in then block:", err);
        }
      })
      .catch((err) => {
        console.log("Registration error:", err.response, err);
        alert(
          err.response?.data?.error ||
            err.response?.data?.message ||
            err.response?.data ||
            "Registration failed"
        );
      });
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubAuth = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  return (
    <div className="self-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-96"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Email:
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="w-full bg-slate-300 dark:bg-gray-700 dark:text-white p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-[36px]"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

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
            placeholder="Choose a username"
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Confirm Password:
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="w-full bg-slate-300 dark:bg-gray-700 dark:text-white p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-[36px]"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 p-3 rounded bg-cyan-600 text-white font-medium hover:scale-[1.02] hover:bg-cyan-700 transition-all duration-200 h-12"
        >
          Create Account
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
          <p className="text-sm dark:text-white">Already have an Account?</p>
          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="bg-cyan-400 hover:scale-[1.02] text-white font-medium rounded-full px-6 py-2 transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
