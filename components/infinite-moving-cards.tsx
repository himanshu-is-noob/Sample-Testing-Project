"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  const getSpeed = () => {
    if (speed === "fast") return "20s";
    if (speed === "normal") return "40s";
    return "80s";
  };

  return (
    <div
      className={cn(
        "relative z-20 max-w-7xl overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max gap-4 py-4 animate-scroll",
          start && "animate-scroll"
        )}
        style={{
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationDuration: getSpeed(),
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="w-[350px] shrink-0 rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-800 dark:bg-black"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {item.quote}
            </p>
            <div className="mt-4">
              <p className="text-sm font-bold">{item.name}</p>
              <p className="text-xs text-gray-500">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
