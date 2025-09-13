/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithubSquare } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToken } from "../customHooks/TokenProvider";
import { useId } from "../customHooks/IdProvider";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function RegisterForm() {
  const navigate = useNavigate();
  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  const { token, setToken } = useToken();
  const { id, setId } = useId();

  const schema = z
    .object({
      email: z.string().email("Please enter a valid email address"),
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
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/register",
        dataToSend
      );
      console.log("Registration success:", res.data);
      setToken(res.data.token);
      setId(res.data.id);
      navigate("/dashboard");
    } catch (err) {
      console.log("Registration error:", err.response, err);
      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.response?.data ||
          "Registration failed"
      );
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubAuth = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  // Helper: always renders the error space, with a margin, even if no error.
  function ErrorSpace({ message }) {
    return (
      <p className="text-red-500 text-sm mt-1 min-h-[20px]">
        {message ? message : "\u00A0"}
      </p>
    );
  }

  return (
    <div className="self-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-96"
      >
        {/* Email */}
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
          <ErrorSpace message={errors.email?.message} />
        </div>

        {/* Username */}
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
          <ErrorSpace message={errors.username?.message} />
        </div>

        <div className="space-y-4">
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Password:
            </label>

            <div className="relative">
              <input
                {...register("password")}
                type={passVisible ? "text" : "password"}
                id="password"
                className="w-full bg-slate-300 dark:bg-gray-700 dark:text-white 
          p-2 pr-10 rounded border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-cyan-500 h-[36px]"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setPassVisible(!passVisible)}
                className="absolute right-3 top-1/2 text-gray-600 dark:text-gray-300 cursor-pointer -translate-y-1/2 active:translate-y-1.5 duration-300 transition-all"
              >
                {passVisible ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <RemoveRedEyeOutlinedIcon />
                )}
              </button>
            </div>

            <div className="mt-1">
              <ErrorSpace message={errors.password?.message} />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Confirm Password:
            </label>

            <input
              {...register("confirmPassword")}
              type={confirmPassVisible ? "text" : "password"}
              id="confirmPassword"
              className="w-full bg-slate-300 dark:bg-gray-700 dark:text-white 
                p-2 pr-10 rounded border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-cyan-500 h-[36px]"
              placeholder="Confirm your password"
            />

            <button
              type="button"
              onClick={() => setConfirmPassVisible(!confirmPassVisible)}
              className="absolute right-3 top-1/2 text-gray-600 dark:text-gray-300 cursor-pointer active:translate-y-1.5 duration-300 transition-all"
            >
              {confirmPassVisible ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <RemoveRedEyeOutlinedIcon />
              )}
            </button>
          </div>
        </div>
        <div>
          <ErrorSpace message={errors.confirmPassword?.message} />
        </div>

        {/* Submit */}
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

        {/* GitHub Button */}
        <button
          type="button"
          onClick={handleGithubAuth}
          className="p-3 rounded bg-cyan-600 text-white hover:scale-[1.02] hover:bg-cyan-700 transition-all duration-200 flex justify-between items-center h-12"
        >
          <span>Continue With Github</span>
          <FaGithubSquare className="w-[24px] h-[24px]" />
        </button>

        {/* Footer */}
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
