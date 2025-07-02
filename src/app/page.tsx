import Link from "next/link";
import Counter from "./components/_shared/Counter";

export default function Home() {
  return (
    <div className="text-amber-50 text-center space-y-4">
      <h1>welcome</h1>
      <Counter />
      <Link
        href="/testy"
        className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go to Testy Page
      </Link>
    </div>
  );
}
