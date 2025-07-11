"use client";

import { useState } from "react";
import { Tag } from "antd";
import PaginatedTable from "@/app/components/_shared/DataTable";
import { getJobPosts } from "../actions/posts";
import { Job } from "../_types/jobposttypes";
import type { ColumnsType } from "antd/es/table";
import ReusableSearchInput from "@/app/components/_shared/antdsearchinput";

const columns: ColumnsType<Job> = [
  {
    title: "Job Title",
    dataIndex: "job_title",
    render: (title: string) => <Tag color="blue">{title}</Tag>,
    sorter: true,
  },
  { title: "Department", dataIndex: "department" },
  { title: "Location", dataIndex: "job_location" },
  { title: "Designation", dataIndex: "designation" },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");

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

      <PaginatedTable<Job>
        columns={columns}
        rowKey="uuid"
        fetcher={fetcher}
        search={search}
      />
    </div>
  );
}
