import { useState } from "react";

type ReusableSearchInputProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
};

export default function ReusableSearchInput({
  placeholder = "Search...",
  onSearch,
}: ReusableSearchInputProps) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch(value.trim());
  };

  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="border border-gray-300 px-4 py-2 rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
