export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={`rounded-xl shadow-lg border p-4 flex items-center gap-3 ${
          toast.type === "success"
            ? "bg-emerald-900/90 border-emerald-500/50 text-emerald-100"
            : "bg-blue-900/90 border-blue-500/50 text-blue-100"
        } backdrop-blur-md min-w-[300px]`}
      >
        {toast.type === "success" ? (
          <span className="text-emerald-400">✔</span>
        ) : (
          <span className="text-blue-400 animate-bounce">⬇</span>
        )}
        <p className="font-medium text-sm">{toast.message}</p>
      </div>
    </div>
  );
}