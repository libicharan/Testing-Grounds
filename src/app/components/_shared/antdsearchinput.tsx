import { useState } from "react";
import { X } from "lucide-react"; // or any icon library like Heroicons, FontAwesome

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

  const handleClear = () => {
    setValue("");
    onSearch(""); // Optional: clear the search result
  };

  return (
    <div className="flex gap-2 w-full items-center">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border border-gray-300 px-4 py-2 rounded w-full pr-10"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
