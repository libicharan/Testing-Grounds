"use client";

import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
  };
};

export default function CustomPaginator({ meta }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (e.page + 1).toString());
    router.push(`?${params.toString()}`);
  };

  const totalPages = Math.ceil(meta.total / meta.per_page);

  return (
    <div className="mt-10 flex flex-col items-center space-y-4">
      <p className="text-sm text-gray-600">
        Showing page <strong>{meta.current_page}</strong> of{" "}
        <strong>{totalPages}</strong> • Total Jobs:{" "}
        <strong>{meta.total}</strong>
      </p>

      <Paginator
        first={(meta.current_page - 1) * meta.per_page}
        rows={meta.per_page}
        totalRecords={meta.total}
        onPageChange={onPageChange}
        className="!p-4 flex justify-center gap-2 text-black"
        template={{
          layout:
            "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
          PageLinks: (options) => {
            const isActive = options.page + 1 === meta.current_page;

            return (
              <span key={`page_${options.page}`} className="inline-flex">
                <button
                  onClick={options.onClick}
                  className={`w-10 h-10 rounded-full mx-1 text-sm flex items-center justify-center transition duration-200 ${
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
    </div>
  );
}
