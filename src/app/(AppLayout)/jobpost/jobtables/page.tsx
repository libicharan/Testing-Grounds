"use client";

import React, { useEffect, useState } from "react";
import { Alert, InputNumber, Select, Spin, Table, Tag, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Job } from "../_types/jobposttypes";
import { getJobPosts } from "../actions/posts";
import { MetaData } from "@/app/(AppLayout)/products/types";
import { useRouter, useSearchParams } from "next/navigation";

const getTagColor = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("developer")) return "blue";
  if (lower.includes("manager")) return "volcano";
  if (lower.includes("intern")) return "green";
  return "geekblue";
};

export default function JobTablesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 0,
    from: 0,
    to: 0,
    page: 0,
    search: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [goPage, setGoPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const updateQuery = (params: Record<string, string>) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => sp.set(key, value));
    router.push(`?${sp.toString()}`);
  };

  const fetchJobs = async (page = 1, per_page = 10) => {
    setLoading(true);
    try {
      const { data, meta } = await getJobPosts(page, per_page);
      setJobs(data);
      setMeta(meta);
      setGoPage(page);
      setPageSize(per_page);
    } catch {
      setError("Failed to fetch job posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "10");
    fetchJobs(page, per_page);
  }, [searchParams]);

  const columns: ColumnsType<Job> = [
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "title",
      render: (title: string) => <Tag color={getTagColor(title)}>{title}</Tag>,
    },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Location", dataIndex: "job_location", key: "location" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => alert(`Viewing ${record.job_title}`)}
        >
          View
        </span>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white">
      <h1 className="text-xl font-bold mb-4 text-center">Job Table</h1>

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
        <>
          <Table<Job>
            dataSource={jobs}
            columns={columns}
            rowKey="uuid"
            pagination={false} // remove built-in pagination
          />

          {/* Custom Pagination Controls */}
          <div className="w-full mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            {/* Left: Total entries */}
            <div>
              Showing <strong>{meta.from}</strong> to <strong>{meta.to}</strong>{" "}
              of <strong>{meta.total}</strong> entries
            </div>

            {/* Center: AntD Pagination arrows */}
            <Pagination
              current={meta.current_page}
              total={meta.total}
              pageSize={pageSize}
              onChange={(page) => {
                updateQuery({
                  page: page.toString(),
                  per_page: pageSize.toString(),
                });
              }}
              showSizeChanger={false}
            />

            {/* Right: Go to + per page */}
            <div className="flex items-center gap-2">
              <span>Go to page:</span>
              <InputNumber
                min={1}
                max={meta.last_page}
                value={goPage}
                onChange={(value) => {
                  if (value) {
                    const validPage = Math.max(
                      1,
                      Math.min(value, meta.last_page),
                    );
                    setGoPage(validPage);
                    updateQuery({
                      page: validPage.toString(),
                      per_page: pageSize.toString(),
                    });
                  }
                }}
                style={{ width: 80 }}
              />
              <span>Rows per page:</span>
              <Select
                value={pageSize}
                onChange={(value) => {
                  updateQuery({ page: "1", per_page: value.toString() });
                }}
                options={[10, 15, 30, 45].map((v) => ({
                  label: `${v}`,
                  value: v,
                }))}
                style={{ width: 100 }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
