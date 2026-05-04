// src/components/ErrorMessage.jsx

export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 fade-up">
      <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        </svg>
      </div>
      <div>
        <p className="font-display font-bold text-red-700 text-sm">Not Found</p>
        <p className="text-red-500 text-sm mt-0.5">{message}</p>
      </div>
    </div>
  );
}
