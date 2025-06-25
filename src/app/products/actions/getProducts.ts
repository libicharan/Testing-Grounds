"use server";

export async function getProducts() {
  const res = await fetch("https://auth.devcri.com/api/products/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include Authorization or API key here if needed
      // 'Authorization': 'Bearer <your_token>'
    },
    cache: "no-store", // Avoid caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}
