"use client";

import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";

type TableSearchInputProps = {
  value: string | number;
  debounce?: number;
  placeholder?: string;
};

const TableSearchInput: React.FC<TableSearchInputProps> = ({
  value,
  debounce = 750,
  placeholder = "Search...",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(String(value));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      updateQuery("search", newValue);
    }, debounce);
  };

  useEffect(() => {
    setSearchValue(String(value));
  }, [value]);

  return (
    <div className="relative w-full sm:max-w-xs">
      {/* Search Icon */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <Icon icon="solar:magnifer-line-duotone" height={18} />
      </span>

      {/* Input field */}
      <InputText
        id="search"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-full shadow-sm text-sm text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      />

      {/* Clear (X) button */}
      {searchValue && (
        <button
          onClick={() => {
            setSearchValue("");
            updateQuery("search", "");
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-red-500 focus:outline-none"
          type="button"
          aria-label="Clear search"
        >
          <Icon icon="carbon:close" height={18} />
        </button>
      )}
    </div>
  );
};

export default TableSearchInput;
