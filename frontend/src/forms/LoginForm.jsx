import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithubSquare } from "react-icons/fa";

function LoginForm() {
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Handle login logic here
  };

  const handleGoogleAuth = () => {
    console.log("Google auth clicked");
    // Handle Google authentication
  };

  const handleGithubAuth = () => {
    console.log("Github auth clicked");
    // Handle Github authentication
  };

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
            onClick={() => navigate("/getstarted/register")}
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
