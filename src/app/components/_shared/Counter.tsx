"use client";
import { useAppSelector, useAppDispatch } from "@/Lib/hooks";
import { increment, decrement } from "@/Lib/features/counterSlice";

export default function Counter() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Counter: {value}</h2>
      <button className="btn" onClick={() => dispatch(increment())}>
        +
      </button>
      <button className="btn ml-2" onClick={() => dispatch(decrement())}>
        -
      </button>
    </div>
  );
}
