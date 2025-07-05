// app/actions/getCandidateList.ts
"use server";

import { getRequest } from "@/services/api";
import { Candidate } from "../_types";

export async function getCandidateList() {
  const res = await getRequest<Candidate[]>("/hrview/candidateList/all");

  if (!res.state || !Array.isArray(res.data)) {
    console.error("🚨 Failed to fetch candidates:", res.message || res.data);
    return { candidates: [] };
  }

  return {
    candidates: res.data,
  };
}
