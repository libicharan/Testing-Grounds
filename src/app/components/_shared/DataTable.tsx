"use client";

import React, { useEffect, useState } from "react";
import { Table, Pagination, Select, InputNumber, Spin, Alert } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

// Types
export type MetaData = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
};

export type SortOrderAntd = "ascend" | "descend" | undefined;
export type SortOrderAPI = "asc" | "desc" | undefined;

export type PaginatedTableProps<T> = {
  columns: ColumnsType<T>;
  rowKey?: string;
  fetcher: (
    page: number,
    perPage: number,
    sortField?: keyof T,
    sortOrder?: SortOrderAPI,
    search?: string,
  ) => Promise<{
    data: T[];
    meta: MetaData;
  }>;
  search?: string;
};

// Map Ant Design sort order to API-compatible sort order
const mapSortOrder = (order: SortOrderAntd): SortOrderAPI => {
  if (order === "ascend") return "asc";
  if (order === "descend") return "desc";
  return undefined;
};

export default function PaginatedTable<T extends object>({
  columns,
  rowKey = "id",
  fetcher,
  search,
}: PaginatedTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 0,
    from: 0,
    to: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof T | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrderAntd>(undefined);

  const fetchData = async (
    page = 1,
    perPage = 10,
    sortFieldParam?: keyof T,
    sortOrderParam?: SortOrderAPI,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data, meta } = await fetcher(
        page,
        perPage,
        sortFieldParam,
        sortOrderParam,
        search,
      );
      setData(data);
      setMeta(meta);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, meta.per_page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onPageChange = (page: number, perPage: number) => {
    fetchData(page, perPage, sortField, mapSortOrder(sortOrder));
  };

  const onTableChange: TableProps<T>["onChange"] = (_, __, sorter) => {
    if (!Array.isArray(sorter)) {
      const field = sorter.field as keyof T | undefined;
      const order = sorter.order as SortOrderAntd;

      setSortField(field);
      setSortOrder(order);

      fetchData(meta.current_page, meta.per_page, field, mapSortOrder(order));
    }
  };

  return (
    <>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <Spin spinning={loading}>
        <Table<T>
          dataSource={data}
          columns={columns}
          rowKey={rowKey}
          pagination={false}
          onChange={onTableChange}
        />
      </Spin>

      <div className="w-full mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        {/* Left: Total entries */}
        <div>
          Showing <strong>{meta.from}</strong> to <strong>{meta.to}</strong> of{" "}
          <strong>{meta.total}</strong> entries
        </div>

        {/* Center: Pagination */}
        <Pagination
          current={meta.current_page}
          total={meta.total}
          pageSize={meta.per_page}
          onChange={(page) => onPageChange(page, meta.per_page)}
          showSizeChanger={false}
        />

        {/* Right: Go to page and rows per page */}
        <div className="flex items-center gap-2">
          <span>Go to page:</span>
          <InputNumber
            min={1}
            max={meta.last_page}
            defaultValue={meta.current_page}
            onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
              const val = parseInt((e.target as HTMLInputElement).value);
              if (!isNaN(val)) {
                const page = Math.max(1, Math.min(val, meta.last_page));
                onPageChange(page, meta.per_page);
              }
            }}
            style={{ width: 80 }}
          />
          <span>Rows per page:</span>
          <Select
            value={meta.per_page}
            onChange={(val) => onPageChange(1, val)}
            options={[10, 15, 30, 45].map((v) => ({ label: `${v}`, value: v }))}
            style={{ width: 100 }}
          />
        </div>
      </div>
    </>
  );
}
