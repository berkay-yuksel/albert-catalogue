"use client";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="empty-state">
      <h3>No matching products found</h3>
      <p>Try broadening your filter selections.</p>
      <button onClick={onClear}>Clear Filters</button>
    </div>
  );
}
