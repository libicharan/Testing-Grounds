// import { EmployeeParamsType } from '@/app/(DashboardLayout)/payroll/bonus/_types';
import config from "@/services/globalconfig";
import { NotificationInstance } from "antd/es/notification/interface";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

type NotificationProps = {
  type: "success" | "info" | "warning" | "error";
  title: string;
  description?: React.ReactNode;
  api: NotificationInstance;
  handleClose?: () => void;
  duration?: number;
};

const openNotification = ({
  type,
  title,
  description,
  api,
  handleClose,
  duration = 2,
}: NotificationProps) => {
  api.open({
    type,
    message: title,
    description,
    placement: "topRight",
    onClose: handleClose,
    duration,
  });
};
const disabledDate = (current: Dayjs | null): boolean => {
  // Disable dates outside the current month
  return (
    !!current &&
    (current.isBefore(dayjs().startOf("month")) ||
      current.isAfter(dayjs().endOf("month")))
  );
};
// const DOBdisabledDate = (current: Dayjs | null): boolean => {
//   // Calculate the minimum allowed date (today minus 18 years)
//   const minAllowedDate = dayjs().subtract(18, 'year').endOf('day');

//   // Disable dates after the minimum allowed date
//   return !!current && current.isAfter(minAllowedDate);
// };

// const getDisabledDate = (disable: boolean | undefined, minimumAge: number) => {
//   if (!disable) return undefined;
//   return (current: Dayjs | null): boolean => {
//     return (
//       !!current &&
//       (current.isAfter(dayjs()) || current.isAfter(dayjs().subtract(minimumAge, 'year')))
//     );
//   };
// };
const getDisabledDate = (disable: boolean | undefined, minimumAge: number) => {
  if (!disable) return undefined;

  return (current: Dayjs | null): boolean => {
    if (!current) return false;

    const today = dayjs();
    const minAgeDate = today.subtract(minimumAge, "year");

    return current.isAfter(today, "day") || current.isAfter(minAgeDate, "day");
  };
};

const getDisabledDateDOB = (
  disable: boolean | undefined,
  dob: string | null,
) => {
  if (!disable || !dob) return undefined;

  return (current: Dayjs | null): boolean => {
    if (!current) return false;

    const today = dayjs().startOf("day"); // Get today without time
    const dobDate = dayjs(dob, "DD-MM-YYYY");
    const eligibleDate = dobDate.add(18, "year").startOf("day"); // DOB + 18 years

    return (
      current.isBefore(eligibleDate, "day") || current.isAfter(today, "day")
    );
  };
};

const getDisabledDateDOBFuture = (
  disable: boolean | undefined,
  dob: string | null,
) => {
  if (!disable || !dob) return undefined;

  return (current: Dayjs | null): boolean => {
    if (!current) return false;

    const dobDate = dayjs(dob, "DD-MM-YYYY");
    const eligibleDate = dobDate.add(18, "year").startOf("day"); // DOB + 18 years

    return current.isBefore(eligibleDate, "day"); // Only disable past dates
  };
};

const dateFormat = "DD/MM/YYYY";

// Helper function to construct query strings
// const createQueryString = <P>(params: P): string => {
//   const query = new URLSearchParams(params as Record<string, string>);
//   return query.toString() ? `?${query.toString()}` : '';
// };
const createQueryString = <P extends Record<string, unknown>>(
  params: P,
): string => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle array values, joining them with commas
      query.append(key, value.join(","));
    } else if (value !== undefined && value !== null) {
      // non-array values
      query.append(key, String(value));
    }
  });
  return query.toString() ? `?${query.toString()}` : "";
};

const setLocalFun = <T>(key: string, value: T) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
// const getUserLocal = (key: string, config: EmployeeParamsType) => {
//   if (typeof window !== 'undefined') {
//     const storedData = localStorage.getItem(key);
//     const data: EmployeeParamsType = storedData
//       ? JSON.parse(storedData)
//       : config;
//     return data;
//   }
//   return config;
// };
// const getUserSession = (key: string, config: EmployeeParamsType) => {
//   if (typeof window !== 'undefined') {
//     const storedData = sessionStorage.getItem(key);
//     const data: EmployeeParamsType = storedData
//       ? JSON.parse(storedData)
//       : config;
//     return data;
//   }
//   return config;
// };
const setSessionFun = <T>(key: string, value: T) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

// Name Hashing
const getInitials = (name: string) => {
  const splitName = name.split(" ");
  if (splitName.length === 1) {
    return splitName[0][0]?.toUpperCase() + splitName[0][1]?.toUpperCase();
  }
  return splitName[0][0]?.toUpperCase() + splitName[1][0]?.toUpperCase();
};

// Function to hash a string (e.g., name) into a number for color generation
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer hashcode
  }
  return hash;
};

// hash color
const getRandomColor = (str: string) => {
  const colors = [
    `lightprimary`,
    `lightsecondary`,
    `lightsuccess`,
    `lightwarning`,
    `lighterror`,
  ];
  const colorIndex = Math.abs(hashString(str)) % colors.length;
  return colors[colorIndex];
};
const getTextColor = (bgColor: string, val = `text-`) => {
  if (bgColor.startsWith("light")) {
    return bgColor.replace(`light`, val);
  }
  return bgColor;
};

const getBadgeColor = (status: string) => {
  switch (status) {
    case "completed":
      return "lightprimary";
    case "scheduled":
      return "lightwarning";
    default:
      return "lightsecondary";
  }
};
const toCapitalize = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

type AddSerialNo<T> = T & { serial_no: number };

const addSerialNumbers = <T>(
  data: T[],
  meta: { current_page: number; per_page: number },
): AddSerialNo<T>[] => {
  return data.map((row, index) => ({
    ...row,
    serial_no: (meta.current_page - 1) * meta.per_page + index + 1,
  }));
};
const getStatusFormattedDate = (date?: string) => {
  return date
    ? dayjs(date, "DD-MM-YYYY").isValid()
      ? dayjs(date, "DD-MM-YYYY").format(config.DATE_FORMAT)
      : "-"
    : "-";
};
const getNameInitials = (name?: string): string => {
  if (!name || typeof name !== "string") return "NA";

  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    const word = parts[0].toUpperCase();
    return word[0] + (word[1] || "");
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export {
  openNotification,
  disabledDate,
  getDisabledDate,
  dateFormat,
  createQueryString,
  setLocalFun,
  // getUserLocal,
  // getUserSession,
  setSessionFun,
  getInitials,
  getRandomColor,
  getTextColor,
  getBadgeColor,
  toCapitalize,
  getDisabledDateDOB,
  getDisabledDateDOBFuture,
  addSerialNumbers,
  getStatusFormattedDate,
  getNameInitials,
};
