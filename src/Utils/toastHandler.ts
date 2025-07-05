// src/utils/toastHandler.ts
"use client";

import { toast } from "react-toastify";

type ToastOptions = {
  statusCode: number;
  message?: string;
};

export const handleToastByStatus = ({ statusCode, message }: ToastOptions) => {
  switch (statusCode) {
    case 200:
      toast.success(message ?? " Request successful!");
      break;
    case 201:
      toast.success(message ?? " Resource created successfully!");
      break;
    case 400:
      toast.warning(message ?? " Bad request. Please check your input.");
      break;
    case 401:
      toast.error(message ?? " Unauthorized. Please login.");
      break;
    case 403:
      toast.error(message ?? " Forbidden. You don’t have access.");
      break;
    case 404:
      toast.warning(message ?? " Resource not found.");
      break;
    case 500:
      toast.error(message ?? " Internal server error.");
      break;
    default:
      toast.info(message ?? `ℹ Received status: ${statusCode}`);
      break;
  }
};
