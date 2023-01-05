"use client";

import useCounter from "@hooks/useCounter";
import { data } from "@lib/initial-counter";

export default function Counter({}) {
  const [count, increment] = useCounter(data);

  return (
    <main>
      <div className="flex flex-col border border-black rounded-lg px-10 pt-2 pb-5 items-center">
        <h2 className="text-3xl">Counter component</h2>
        <button
          className="border border-black rounded-lg bg-black bg-opacity-10 hover:bg-opacity-30 px-20 py-1"
          onClick={increment}
        >
          {count}
        </button>
      </div>
    </main>
  );
}
