// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx
// Sets up React Router routes for the three pages:
//   /                 → SearchPage (main)
//   /payment/success  → SuccessPage
//   /payment/fail     → FailPage
//   /payment/cancel   → CancelPage
// ─────────────────────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import { SuccessPage, FailPage, CancelPage } from "./pages/PaymentResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                 element={<SearchPage />} />
        <Route path="/payment/success"  element={<SuccessPage />} />
        <Route path="/payment/fail"     element={<FailPage />} />
        <Route path="/payment/cancel"   element={<CancelPage />} />
      </Routes>
    </BrowserRouter>
  );
}
