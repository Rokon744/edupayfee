// ─────────────────────────────────────────────────────────────────────────────
// src/components/SearchBox.jsx
// ─────────────────────────────────────────────────────────────────────────────

export default function SearchBox({ roll, setRoll, onSubmit, loading }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md fade-up"
      style={{ animationDelay: "0.1s" }}
    >
      <div className="relative flex items-center bg-white rounded-2xl shadow-card border border-brand-100 overflow-hidden focus-within:ring-2 focus-within:ring-brand-400 transition-shadow duration-200">

        {/* Search icon */}
        <div className="pl-4 pr-2 text-brand-400 shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          placeholder="Enter Student Roll (e.g. CSE-2024-01)"
          className="flex-1 py-4 px-2 text-ink font-body text-sm outline-none bg-transparent placeholder:text-slate-400 uppercase"
          disabled={loading}
          autoFocus
        />

        <button
          type="submit"
          disabled={loading || !roll.trim()}
          className="m-2 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-semibold font-display text-sm px-5 py-2.5 rounded-xl transition-colors duration-200 shrink-0"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center mt-3">
        Try: <span className="font-semibold text-brand-500 cursor-pointer" onClick={() => setRoll("CSE-2024-01")}>CSE-2024-01</span>
        {" · "}
        <span className="font-semibold text-brand-500 cursor-pointer" onClick={() => setRoll("EEE-2024-01")}>EEE-2024-01</span>
        {" · "}
        <span className="font-semibold text-brand-500 cursor-pointer" onClick={() => setRoll("BBA-2024-01")}>BBA-2024-01</span>
      </p>
    </form>
  );
}
