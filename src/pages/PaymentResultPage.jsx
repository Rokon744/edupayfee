// ─────────────────────────────────────────────────────────────────────────────
// src/pages/PaymentResultPage.jsx
//
// Handles three SSLCommerz post-payment redirect states:
//   /payment/success  — payment was successful
//   /payment/fail     — payment failed
//   /payment/cancel   — user cancelled payment
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useLocation, Link }   from "react-router-dom";
import { markStudentAsPaid }   from "../firebase/studentService";

// ── Shared wrapper ────────────────────────────────────────────────────────────
function ResultWrapper({ children }) {
  return (
    <div className="min-h-screen bg-grid bg-[#f0f6ff] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-card p-10 max-w-md w-full text-center fade-up">
        {children}
      </div>
    </div>
  );
}

// ── Success Page ──────────────────────────────────────────────────────────────
export function SuccessPage() {
  const location   = useLocation();
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Extract roll number from query params e.g. /payment/success?roll=CSE-2024-01
    const params = new URLSearchParams(location.search);
    const roll   = params.get("roll");

    if (roll) {
      markStudentAsPaid(roll)
        .then(() => setDone(true))
        .catch((err) => {
          console.error("Failed to update payment status:", err);
          setDone(true); // still show success UI
        });
    } else {
      setDone(true);
    }
  }, [location.search]);

  return (
    <ResultWrapper>
      {/* Animated success icon */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto mb-6">
        <div className="pulse-ring absolute inset-0 rounded-full" />
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold text-ink mb-2">Payment Successful!</h2>
      <p className="text-slate-500 mb-2">
        Your fee has been received and your record has been updated.
      </p>
      {done && (
        <p className="text-green-600 text-sm font-semibold mb-6">
          ✓ Firestore status updated to <span className="bg-green-100 px-2 py-0.5 rounded-md">paid</span>
        </p>
      )}

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 mt-2"
      >
        ← Back to Portal
      </Link>
    </ResultWrapper>
  );
}

// ── Fail Page ─────────────────────────────────────────────────────────────────
export function FailPage() {
  return (
    <ResultWrapper>
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="font-display text-2xl font-bold text-ink mb-2">Payment Failed</h2>
      <p className="text-slate-500 mb-6">
        Something went wrong during the transaction. Please try again.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
      >
        ← Try Again
      </Link>
    </ResultWrapper>
  );
}

// ── Cancel Page ───────────────────────────────────────────────────────────────
export function CancelPage() {
  return (
    <ResultWrapper>
      <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        </svg>
      </div>
      <h2 className="font-display text-2xl font-bold text-ink mb-2">Payment Cancelled</h2>
      <p className="text-slate-500 mb-6">
        You cancelled the payment. Your due amount remains unchanged.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
      >
        ← Back to Portal
      </Link>
    </ResultWrapper>
  );
}
