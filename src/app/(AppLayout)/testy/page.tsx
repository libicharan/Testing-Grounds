import Counter from "@/app/components/_shared/Counter";
import Link from "next/link";

export default function Testy() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Counter Page</h1>
      <Counter />
      <Link
        href="/"
        className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go to Testy Page
      </Link>
    </div>
  );
}
