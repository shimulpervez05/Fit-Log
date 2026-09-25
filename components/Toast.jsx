"use client";

import { useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
}) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  const isSuccess = type === "success";

  return (
    <div className="toast-container">
      <div
        role="status"
        aria-live="polite"
        className="toast flex items-center gap-3"
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            isSuccess
              ? "bg-[#6D5DFB]/10 text-[#6D5DFB]"
              : "bg-blue-500/10 text-blue-400"
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 size={18} />
          ) : (
            <Info size={18} />
          )}
        </span>

        <p className="flex-1 text-sm font-semibold text-[#17172B]">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#6B6B80] transition hover:bg-[#F0EEFF] hover:text-white"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}