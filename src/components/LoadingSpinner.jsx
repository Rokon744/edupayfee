// ─────────────────────────────────────────────────────────────────────────────
// src/components/LoadingSpinner.jsx
// ─────────────────────────────────────────────────────────────────────────────

export default function LoadingSpinner() {
  return (
    <div className="bg-white rounded-3xl shadow-card border border-brand-100 p-6 fade-up">
      {/* Shimmer header row */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl shimmer" />
        <div className="flex-1">
          <div className="h-4 w-32 rounded-lg shimmer mb-2" />
          <div className="h-3 w-20 rounded-lg shimmer" />
        </div>
      </div>
      <div className="h-px bg-slate-100 my-4" />
      {/* Shimmer amount */}
      <div className="bg-brand-50 rounded-2xl p-4 mb-5">
        <div className="h-3 w-24 rounded-lg shimmer mb-2" />
        <div className="h-8 w-36 rounded-lg shimmer" />
      </div>
      {/* Shimmer button */}
      <div className="h-14 w-full rounded-2xl shimmer" />
    </div>
  );
}
