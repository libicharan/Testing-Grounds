"use server";

import { getRequest } from "@/services/api";

export type Product = {
  id: number;
  name: string;
  short_description: string;
  description: string;
  product_url: string;
  product_image: string;
  color_code: string;
  status: number;
};

export async function fetchProducts() {
  const res = await getRequest<Product[]>("/products/list");

  if (!res.state || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}
