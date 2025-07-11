"use server";

import { getRequest, postRequest } from "@/services/api";
import { Job } from "../_types/jobposttypes";
import { CustomResponse, MetaData } from "@/app/(AppLayout)/products/types";

export async function getJobPosts(
  page = 1,
  per_page = 10,
  search = "",
): Promise<{ data: Job[]; meta: MetaData }> {
  const res: CustomResponse<Job[]> = await getRequest<Job[]>("/job-posts", {
    page,
    per_page,
    search,
  });

  if (!res.state || !res.data || !res.meta) {
    console.warn("⚠️ Failed to fetch job posts or missing meta", res);
    return {
      data: [],
      meta: {
        total: 0,
        per_page,
        current_page: page,
        last_page: 0,
        from: 0,
        to: 0,
        page: 0,
        search: "",
      },
    };
  }

  return {
    data: res.data,
    meta: res.meta,
  };
}

type CreateSkillPayload = {
  job_category_id: number;
  skill_name: string[];
};

type SkillResponse = {
  id: number;
  job_category_id: number;
  skill_name: string[];
};

export async function postTestSkill(
  formData: CreateSkillPayload,
): Promise<CustomResponse<SkillResponse>> {
  const res = await postRequest<CreateSkillPayload, SkillResponse>(
    "/skill-sets",
    formData,
  );

  console.log("✅ Skill POST response:", res);
  return res;
}

export type CategoryOption = {
  value: number;
  label: string;
};

export async function getSkillCategories(): Promise<CategoryOption[]> {
  const res = await getRequest<CategoryOption[]>("/skill-sets/list");

  if (res.state && res.data) {
    return res.data;
  }

  console.error("Failed to fetch skill categories", res.message);
  return [];
}
