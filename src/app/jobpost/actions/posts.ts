// src/app/jobpost/actions/posts.ts
"use server";

import config from "@/services/globalconfig";
import { headers } from "next/headers";
import { Job, PaginationMeta } from "../_types/jobposttypes";

export async function getJobPosts(
  page = 1,
): Promise<{ data: Job[]; meta: PaginationMeta }> {
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

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();
  console.log("✅ API JSON response:", json);

  return {
    data: json.data ?? [],
    meta: json.meta ?? {
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      from: 0,
      to: 0,
    },
  };
}
