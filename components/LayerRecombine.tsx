"use client";

import { useState } from "react";
import type { PatternLayer } from "@/data/patterns";

export default function LayerRecombine({
  layers,
  accent = "#9c5b3b",
}: {
  layers: PatternLayer;
  accent?: string;
}) {
  const [show, setShow] = useState({
    inner: true,
    middle: true,
    outer: true,
  });
  const toggle = (k: keyof typeof show) =>
    setShow((s) => ({ ...s, [k]: !s[k] }));

  const rows = [
    { key: "outer" as const, label: "外层 · 环绕环饰", val: layers.outer },
    { key: "middle" as const, label: "中层 · 主体图案", val: layers.middle },
    { key: "inner" as const, label: "内层 · 核心意象", val: layers.inner },
  ];

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
      <svg viewBox="0 0 200 200" className="h-48 w-48 shrink-0">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeDasharray="6 6"
          opacity={show.outer ? 1 : 0.12}
          style={{ transition: "opacity .4s" }}
        />
        <circle
          cx="100"
          cy="100"
          r="62"
          fill="none"
          stroke={accent}
          strokeWidth="6"
          opacity={show.middle ? 0.85 : 0.12}
          style={{ transition: "opacity .4s" }}
        />
        <circle
          cx="100"
          cy="100"
          r="30"
          fill={accent}
          opacity={show.inner ? 0.9 : 0.12}
          style={{ transition: "opacity .4s" }}
        />
      </svg>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <p className="mb-1 text-sm font-medium text-mo/70">
          三层嵌套构图 · 点击显隐重组
        </p>
        {rows.map((row) => (
          <button
            key={row.key}
            onClick={() => toggle(row.key)}
            className={`flex items-center justify-between gap-4 rounded-lg border px-3 py-2 text-left text-sm transition ${
              show[row.key]
                ? "border-jin/50 bg-mibai-light"
                : "border-mo/10 opacity-60"
            }`}
          >
            <span className="font-medium text-mo">{row.label}</span>
            <span className="text-xs text-mo/50">{row.val}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
