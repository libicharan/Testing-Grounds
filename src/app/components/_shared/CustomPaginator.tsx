// src/components/shared/CustomPaginator.tsx
"use client";

import React from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

type Props = {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
  };
  onPageChange: (page: number) => void;
};

const CustomPaginator: React.FC<Props> = ({ meta, onPageChange }) => {
  const first = (meta.current_page - 1) * meta.per_page;

  return (
    <div className="flex justify-center mt-6">
      <Paginator
        first={first}
        rows={meta.per_page}
        totalRecords={meta.total}
        onPageChange={(e: PaginatorPageChangeEvent) => {
          const newPage = Math.floor(e.first / e.rows) + 1;
          onPageChange(newPage);
        }}
        template="PrevPageLink PageLinks NextPageLink"
        className="shadow-sm rounded"
      />
    </div>
  );
};

export default CustomPaginator;
