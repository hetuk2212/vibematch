"use client";

import { useEffect, useState } from "react";

type ListenerCountProps = {
  base: number;
  className?: string;
};

export default function ListenerCount({ base, className }: ListenerCountProps) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    const min = Math.round(base * 0.6);
    const max = Math.round(base * 1.4);

    const id = setInterval(() => {
      setCount((prev) => {
        const drift = Math.round((Math.random() - 0.5) * 14);
        return Math.min(max, Math.max(min, prev + drift));
      });
    }, 2500 + Math.random() * 2000);

    return () => clearInterval(id);
  }, [base]);

  return (
    <span className={className}>
      <span className="vibe-live-dot" aria-hidden="true" />
      {count.toLocaleString()} listening
    </span>
  );
}
