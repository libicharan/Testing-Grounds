import type { MenuItem } from "primereact/menuitem";

export const BreadCrumbsroutes: Record<string, MenuItem[]> = {
  jobpost: [
    { label: "products", url: "/products" },
    { label: "Add Job", url: "/jobs/add" },
  ],
  dashboard: [{ label: "Dashboard", url: "/dashboard" }],
};
