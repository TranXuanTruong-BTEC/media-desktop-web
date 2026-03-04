import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle =
    "fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-sm font-medium z-50 transition";

  const typeStyle =
    type === "error"
      ? "bg-red-600 text-white"
      : "bg-green-600 text-white";

  return (
    <div className={`${baseStyle} ${typeStyle}`}>
      {message}
    </div>
  );
}