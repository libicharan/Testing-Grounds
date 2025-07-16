// components/table/useAntdFilters.ts
"use client";

import { useEffect, useState } from "react";
import { getRequest } from "@/services/api";

export type AntdFilterOption = {
  text: string;
  value: string | number;
};

// Expected response type: { value: number | string; label: string }
export function useAntdFilters(
  endpoint: string, // Example: "/myrecruit/job-posts/department-list/1"
) {
  const [filters, setFilters] = useState<AntdFilterOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFilters() {
      try {
        setLoading(true);
        const res =
          await getRequest<{ value: string | number; label: string }[]>(
            endpoint,
          );
        if (res.state && res.data) {
          const formatted: AntdFilterOption[] = res.data.map((item) => ({
            text: item.label,
            value: item.value,
          }));
          setFilters(formatted);
        } else {
          console.warn("Filter fetch failed:", res.message);
          setError(res.message || "Unknown error while loading filters");
        }
      } catch (err) {
        setError("Error fetching filter options");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFilters();
  }, [endpoint]);

  return { filters, loading, error };
}
