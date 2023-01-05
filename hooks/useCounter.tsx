import { useState } from "react";

export default function useCounter(initialValue: number): [number, () => void] {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount(count + 1);
  }

  return [count, increment];
}
