"use client";

import React, { useEffect, useState } from "react";
import { Alert, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Job } from "../_types/jobposttypes";
import { getJobPosts } from "../actions/posts";
import { DataTable } from "@/app/components/_shared/DataTable";

const columns: ColumnsType<Job> = [
  { title: "Job Title", dataIndex: "job_title", key: "title" },
  { title: "Department", dataIndex: "department", key: "department" },
  { title: "Location", dataIndex: "job_location", key: "location" },
  { title: "designation", dataIndex: "designation", key: "designation" },
];

export default function JobTablesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data } = await getJobPosts();
        setJobs(data);
      } catch {
        setError("Failed to fetch job posts");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white">
      <h1 className="text-xl font-bold mb-4">Job Table</h1>

      {error ? (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="dark:bg-neutral-800 dark:text-white"
        />
      ) : loading ? (
        <Spin tip="Loading jobs...">
          <div style={{ minHeight: 200 }} />
        </Spin>
      ) : (
        <DataTable<Job>
          data={jobs}
          columns={columns}
          loading={loading}
          pagination={false}
          rowKey="uuid"
        />
      )}
    </div>
  );
}
