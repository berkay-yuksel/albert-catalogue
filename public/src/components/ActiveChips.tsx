"use client";

import type { Chip } from "@/lib/filtering";

export function ActiveChips({
  chips,
  onRemove,
}: {
  chips: Chip[];
  onRemove: (chip: Chip) => void;
}) {
  if (chips.length === 0) return <div className="active-chips" />;

  return (
    <div className="active-chips">
      {chips.map((c, i) => (
        <span className="chip" key={`${c.type}-${"key" in c ? c.key : ""}-${i}`}>
          {c.label}
          <button onClick={() => onRemove(c)}>✕</button>
        </span>
      ))}
    </div>
  );
}
