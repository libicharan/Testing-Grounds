"use server";

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

export async function getProducts() {
  const res = await fetch("https://auth.devcri.com/api/products/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();

  return json.data;
}
