// src/app/jobpost/actions/posts.ts
"use server";

import config from "@/services/globalconfig";
import { headers } from "next/headers";
import { Job } from "../_types/jobposttypes";

export type Meta = {
  total: number;
  per_page: number;
  current_page: number;
  last_page?: number;
  from?: number;
  to?: number;
};

export async function getJobPosts(
  page = 1,
): Promise<{ data: Job[]; meta: Meta }> {
  if (!config.API_URL) throw new Error("API_URL is not defined");

  const cookie = (await headers())?.get("cookie");

  const headersObj: HeadersInit = {
    accept: "application/json",
    ...(cookie ? { Cookie: cookie } : {}),
  };

  const res = await fetch(`${config.API_URL}/job-posts?page=${page}`, {
    credentials: "include",
    headers: headersObj,
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const json = await res.json();
  console.log("✅ API response:", json);

  if (json?.data && json?.meta) {
    return { data: json.data, meta: json.meta };
  } else {
    console.warn("⚠️ Unexpected response format", json);
    return { data: [], meta: { total: 0, per_page: 10, current_page: page } };
  }
}
