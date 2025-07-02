"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "./_Validation/ValidationSchema";

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
    // TODO: Handle login API
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl p-8 rounded-2xl w-full max-w-md mx-auto text-white"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-2 rounded-md bg-white/10 border ${
            errors.email ? "border-red-400" : "border-white/40"
          } placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-300 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`w-full px-4 py-2 rounded-md bg-white/10 border ${
            errors.password ? "border-red-400" : "border-white/40"
          } placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-sm text-red-300 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition font-semibold"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
