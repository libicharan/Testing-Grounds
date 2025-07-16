"use client";

import { useState } from "react";
import { Tag } from "antd";
import PaginatedTable from "@/app/components/_shared/DataTable";
import { getJobPosts } from "../actions/posts";
import { Job } from "../_types/jobposttypes";
import type { ColumnsType } from "antd/es/table";
import ReusableSearchInput from "@/app/components/_shared/antdsearchinput";
import { useAntdFilters } from "@/app/components/table/useAntdFilters";

export default function JobsPage() {
  const [search, setSearch] = useState("");

  // ✅ Load department filters
  const { filters: departmentFilters, loading } = useAntdFilters(
    `/job-categories/department-list`,
  );

  // ✅ Define columns after departmentFilters is available
  const columns: ColumnsType<Job> = [
    {
      title: "Job Title",
      dataIndex: "job_title",
      render: (title: string) => <Tag color="blue">{title}</Tag>,
      sorter: true,
    },
    {
      title: "Department",
      dataIndex: "department",
      filters: departmentFilters,
      onFilter: (value, record) => record.department === value,
    },
    { title: "Location", dataIndex: "job_location" },
    { title: "Designation", dataIndex: "designation" },
  ];

  // ✅ Paginated fetcher
  const fetcher = async (
    page: number,
    perPage: number,
    sortField?: keyof Job,
    sortOrder?: "asc" | "desc",
    searchtext?: string,
  ) => {
    return getJobPosts(
      page,
      perPage,
      searchtext ?? "",
      sortField ?? "",
      sortOrder ?? "asc",
    );
  };

  return (
    <div className="p-4 space-y-4">
      <ReusableSearchInput
        placeholder="Search jobs..."
        onSearch={(val) => setSearch(val)}
      />

      {/* ✅ Skip rendering if filters are still loading */}
      {loading ? (
        <p>Loading filters...</p>
      ) : (
        <PaginatedTable<Job>
          columns={columns}
          rowKey="uuid"
          fetcher={fetcher}
          search={search}
        />
      )}
    </div>
  );
}
