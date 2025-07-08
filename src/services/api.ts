"use server";

import { CustomResponse } from "@/app/(AppLayout)/products/types";
import config from "./globalconfig";
import { createQueryString, QueryParams } from "@/Utils/helper";

// Generic interface for API client parameters
interface RequestParams<T> {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: T;
  params?: QueryParams;
  tags?: string[];
}

// Core request handler
async function handleRequest<T, R>({
  endpoint,
  method,
  data,
  params,
  tags,
}: RequestParams<T>): Promise<CustomResponse<R>> {
  if (!config.API_URL) {
    throw new Error("API_URL is not defined");
  }

  const queryString = params ? createQueryString(params) : "";
  const url = `${config.API_URL}${endpoint}${queryString}`;

  try {
    const response = await fetch(url, {
      method,
      next: tags ? { tags } : undefined,
      headers: {
        Accept: "application/json",
        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
      },
      ...(data && {
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    });

    const responseBody = await response.json();

    console.log(
      `📦 Response from ${method} ${url}:\n`,
      JSON.stringify(responseBody, null, 2),
    );
    const isSuccess =
      response.ok &&
      (responseBody?.status === undefined || responseBody?.status === true);

    if (!response.ok || !isSuccess) {
      return {
        state: false,
        statusCode: response.status,
        message: responseBody?.message || "API error occurred",
        errors: responseBody?.errors ?? null,
        data: undefined,
      };
    }

    return {
      state: true,
      statusCode: response.status,
      message: responseBody.message ?? "Success",
      data: responseBody.data,
      meta: responseBody.meta,
    };
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    return {
      state: false,
      statusCode: 500,
      message:
        error instanceof Error ? error.message : "Unexpected server error",
      data: undefined,
    };
  }
}

// Exported request wrappers
export const getRequest = async <R>(
  endpoint: string,
  params?: QueryParams,
  tags?: string[],
): Promise<CustomResponse<R>> =>
  handleRequest<undefined, R>({ endpoint, method: "GET", params, tags });

export const postRequest = async <T, R>(
  endpoint: string,
  data: T,
): Promise<CustomResponse<R>> =>
  handleRequest<T, R>({ endpoint, method: "POST", data });

export const putRequest = async <T, R>(
  endpoint: string,
  data: T,
): Promise<CustomResponse<R>> =>
  handleRequest<T, R>({ endpoint, method: "PUT", data });

export const patchRequest = async <T, R>(
  endpoint: string,
  data: T,
): Promise<CustomResponse<R>> =>
  handleRequest<T, R>({ endpoint, method: "PATCH", data });

export const deleteRequest = async <T, R>(
  endpoint: string,
  data?: T,
): Promise<CustomResponse<R>> =>
  handleRequest<T, R>({ endpoint, method: "DELETE", data });

//   // GET with query params
// const res = await getRequest<Job[]>('/jobpost', {
//   page: 1,
//   per_page: 10,
//   search: 'react',
// });

// // POST
// const res = await postRequest<NewJobPayload, JobResponse>('/jobpost', {
//   title: 'React Developer',
//   description: 'Remote position',
// });

// // DELETE with data (if backend expects body)
// const res = await deleteRequest<{ id: string }, { deleted: boolean }>('/jobpost', {
//   id: 'abc123',
// });
