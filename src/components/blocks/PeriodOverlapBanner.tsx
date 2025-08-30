"use client";

export default function PeriodOverlapBanner({ overlaps }: { overlaps: boolean }) {
  if (!overlaps) return null;
  return (
    <div className="bg-yellow-100 text-yellow-800 p-2 rounded">
      ⚠️ This time range overlaps an existing locked batch.
    </div>
  );
}