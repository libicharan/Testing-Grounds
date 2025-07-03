"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../_Validation/ValidationSchema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md md:max-w-lg bg-white p-10 rounded-xl shadow-xl space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Welcome Back
      </h2>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.email ? "border-red-400" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.password ? "border-red-400" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
