// ─────────────────────────────────────────────────────────────────────────────
// src/pages/SearchPage.jsx
//
// Main page: search for a student by roll number, display their info,
// and trigger the SSLCommerz payment flow.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { getStudentByRoll } from "../firebase/studentService";
import { initiatePayment }   from "../payment/sslService";
import StudentCard           from "../components/StudentCard";
import SearchBox             from "../components/SearchBox";
import LoadingSpinner        from "../components/LoadingSpinner";
import ErrorMessage          from "../components/ErrorMessage";

export default function SearchPage() {
  const [roll,      setRoll]      = useState("");
  const [student,   setStudent]   = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [payLoading,setPayLoading]= useState(false);
  const [error,     setError]     = useState("");

  // ── Search student by roll ────────────────────────────────────────────────
  async function handleSearch(e) {
    e.preventDefault();
    if (!roll.trim()) return;

    setLoading(true);
    setError("");
    setStudent(null);

    try {
      const data = await getStudentByRoll(roll);
      if (!data) {
        setError(`No student found with Roll: "${roll.trim().toUpperCase()}"`);
      } else {
        setStudent(data);
      }
    } catch (err) {
      setError("Failed to fetch student data. Please check your Firebase config.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ── Initiate SSLCommerz payment ───────────────────────────────────────────
  async function handlePayNow() {
    if (!student) return;
    setPayLoading(true);
    setError("");

    // Build redirect URLs pointing back to this app
    const base       = window.location.origin;
    const successUrl = `${base}/payment/success?roll=${student.id}`;
    const failUrl    = `${base}/payment/fail`;
    const cancelUrl  = `${base}/payment/cancel`;

    try {
      const gatewayUrl = await initiatePayment({
        studentName: student.name,
        studentRoll: student.id,
        amount:      student.dueAmount,
        successUrl,
        failUrl,
        cancelUrl,
      });

      // Redirect user to SSLCommerz hosted payment page
      window.location.href = gatewayUrl;

    } catch (err) {
      setError("Payment initiation failed. " + err.message);
      console.error(err);
    } finally {
      setPayLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-grid bg-[#f0f6ff] flex flex-col items-center px-4 py-16">

      {/* ── Header ── */}
      <div className="text-center mb-12 fade-up">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse inline-block" />
          Secure Fee Portal
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-ink leading-tight">
          Student Fee <span className="text-brand-600">Payment</span>
        </h1>
        <p className="text-slate-500 mt-3 text-base max-w-md mx-auto font-body">
          Enter your roll number to view your due amount and pay securely via SSLCommerz.
        </p>
      </div>

      {/* ── Search Box ── */}
      <SearchBox
        roll={roll}
        setRoll={setRoll}
        onSubmit={handleSearch}
        loading={loading}
      />

      {/* ── States ── */}
      <div className="w-full max-w-md mt-8">
        {loading && <LoadingSpinner />}

        {error && !loading && (
          <ErrorMessage message={error} />
        )}

        {student && !loading && (
          <StudentCard
            student={student}
            onPay={handlePayNow}
            payLoading={payLoading}
          />
        )}
      </div>

    </div>
  );
}
