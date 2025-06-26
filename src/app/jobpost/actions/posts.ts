"use server";

import config from "@/services/globalconfig";
import { headers } from "next/headers";
import { Job } from "../_types/jobposttypes";

interface headers {
  headers?: HeadersInit;
}

export async function getJobPosts(): Promise<Job[]> {
  if (!config.API_URL) throw new Error("API_URL is not defined");
  const cookie = (await headers())?.get("cookie");

  const headersObj: HeadersInit = {
    accept: "application/json",
    ...(cookie ? { Cookie: cookie } : {}),
  };

  const res = await fetch(`${config.API_URL}/job-posts`, {
    credentials: "include",
    headers: headersObj,
  });

  //  console.log('res',res)

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const json = await res.json();
    console.log("✅ API JSON response:", json);

    // Check for common API structure
    if (Array.isArray(json)) {
      return json; // directly an array
    } else if (Array.isArray(json.data)) {
      return json.data; // array under `data`
    } else {
      console.warn("🚨 Unexpected format", json);
      return [];
    }
  } else {
    const text = await res.text(); // fallback for HTML or plain text
    console.warn("Expected JSON, got:", text);
    return [];
  }
}
