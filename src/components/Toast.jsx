import { CheckCircle2, XCircle } from 'lucide-react';

// Small reusable success/error banner. Controlled entirely by props —
// parent decides when to show it and what it says.
export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div
      className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50 animate-[fadeUp_0.3s_ease-out] ${
        isSuccess ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
      }`}
    >
      {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
      {message}
      <button onClick={onClose} className="ml-2 text-xs opacity-60 hover:opacity-100">
        ✕
      </button>
    </div>
  );
}
