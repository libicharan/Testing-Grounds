"use client";

import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
};

const rowsOptions = [
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "25", value: 25 },
];

export default function CustomPaginator({ meta }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [rows, setRows] = useState(meta.per_page);
  const [goPage, setGoPage] = useState(meta.current_page.toString());

  const totalPages = meta.last_page;

  useEffect(() => {
    setGoPage(meta.current_page.toString());
  }, [meta.current_page]);

  const updateParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => params.set(key, val));
    router.push(`?${params.toString()}`);
  };

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    updateParams({ page: (e.page + 1).toString(), per_page: rows.toString() });
  };

  const onRowsChange = (newRows: number) => {
    setRows(newRows);
    updateParams({ page: "1", per_page: newRows.toString() });
  };

  const onGoToPage = (value: string) => {
    const pageNum = parseInt(value);
    if (!isNaN(pageNum) && pageNum > 0 && pageNum <= meta.last_page) {
      updateParams({ page: pageNum.toString(), per_page: rows.toString() });
    }
  };

  return (
    <div className="mt-10 w-full px-10 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-gray-700">
      {/* Left: Total */}
      <div className="flex items-center text-bold text-black">
        Rows <strong className="ml-1">{meta.total}</strong>
      </div>

      {/* Center: Pagination */}
      <Paginator
        first={(meta.current_page - 1) * rows}
        rows={rows}
        totalRecords={meta.total}
        onPageChange={onPageChange}
        className="!p-2 text-black cursor-not-allowed"
        template={{
          layout:
            "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
          PageLinks: (options) => {
            const isActive = options.page + 1 === meta.current_page;

            return (
              <span key={`page_${options.page}`} className="inline-flex">
                <button
                  onClick={options.onClick}
                  className={`w-8 h-8 rounded-full mx-1 text-sm flex items-center justify-center transition duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                  aria-label={`Page ${options.page + 1}`}
                >
                  {options.page + 1}
                </button>
              </span>
            );
          },
        }}
      />

      {/* Right: Page X of Y + Rows Dropdown + Go To Page */}
      <div className="flex items-center gap-4">
        <span>
          Page <strong>{meta.current_page}</strong> of{" "}
          <strong>{totalPages}</strong>
        </span>

        {/* Go to page input */}
        <input
          type="number"
          min={1}
          max={totalPages}
          value={goPage}
          onChange={(e) => {
            const value = e.target.value;
            const num = parseInt(value);

            if (isNaN(num)) return;

            let validPage = num;

            if (num < 1) validPage = 1;
            else if (num > totalPages) validPage = totalPages;

            setGoPage(validPage.toString());
            onGoToPage(validPage.toString());
          }}
          className="border px-3 py-1 rounded-md w-16 text-center no-spinner"
        />

        {/* Rows per page dropdown */}
        <Dropdown
          value={rows}
          options={rowsOptions}
          onChange={(e) => onRowsChange(e.value)}
          className="!text-sm"
          panelClassName="!text-sm"
          dropdownIcon="pi pi-chevron-down"
          style={{
            height: "36px",
            border: "1px solid #000",
            borderRadius: "6px",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
          }}
        />
      </div>
    </div>
  );
}
