// components/DataTable.tsx
"use client";

import React from "react";
import { Table, Alert } from "antd";
import type { TableProps, ColumnsType } from "antd/es/table";

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnsType<T>;
  loading?: boolean;
  pagination?: boolean | TableProps<T>["pagination"];
  rowKey?: string | ((record: T) => string);
  onRowClick?: (record: T) => void;
};

export function DataTable<T extends object>({
  data,
  columns,
  loading = false,
  rowKey = "id",
  onRowClick,
}: DataTableProps<T>) {
  try {
    if (!Array.isArray(data)) throw new Error("Invalid data format.");
    if (!Array.isArray(columns)) throw new Error("Invalid columns format.");

    return (
      <Table<T>
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey={rowKey}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
          style: { cursor: onRowClick ? "pointer" : "default" },
        })}
        scroll={{ x: true }}
      />
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return (
      <Alert
        message="Table Render Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }
}
