// ─────────────────────────────────────────────────────────────────────────────
// src/components/StudentCard.jsx
// ─────────────────────────────────────────────────────────────────────────────

export default function StudentCard({ student, onPay, payLoading }) {
  const isPaid = student.status === "paid";

  return (
    <div className="bg-white rounded-3xl shadow-card border border-brand-100 p-6 fade-up">

      {/* ── Card Header ── */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          {/* Avatar circle with initials */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-display font-bold text-lg shadow-glow shrink-0">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-display font-bold text-ink text-lg leading-tight">{student.name}</h3>
            <p className="text-xs text-slate-400 font-semibold tracking-widest uppercase mt-0.5">{student.id}</p>
          </div>
        </div>

        {/* Status badge */}
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${
          isPaid
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        }`}>
          {isPaid ? "✓ Paid" : "● Unpaid"}
        </span>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-slate-100 my-4" />

      {/* ── Due Amount ── */}
      <div className="bg-brand-50 rounded-2xl p-4 flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-brand-600 font-semibold uppercase tracking-wider mb-1">Due Amount</p>
          <p className="font-display text-3xl font-extrabold text-brand-700">
            ৳ {student.dueAmount.toLocaleString("en-BD")}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* ── Pay Button or Paid Message ── */}
      {isPaid ? (
        <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-2xl p-3.5 text-green-700 font-semibold">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Fee already paid. No due amount.
        </div>
      ) : (
        <button
          onClick={onPay}
          disabled={payLoading}
          className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 disabled:opacity-60 text-white font-display font-bold text-base py-4 rounded-2xl shadow-glow transition-all duration-200 flex items-center justify-center gap-2"
        >
          {payLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Redirecting to Payment…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Pay ৳ {student.dueAmount.toLocaleString("en-BD")} via SSLCommerz
            </>
          )}
        </button>
      )}

      {/* ── SSLCommerz badge ── */}
      {!isPaid && (
        <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secured by SSLCommerz Sandbox
        </p>
      )}
    </div>
  );
}
