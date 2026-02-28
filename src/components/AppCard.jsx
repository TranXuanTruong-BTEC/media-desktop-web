import { Download } from "lucide-react";

export default function AppCard({ app }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col">
      <h3 className="text-xl font-bold">{app.name}</h3>

      <p className="text-sm text-gray-400 mt-2 flex-grow">
        {app.description}
      </p>

      <div className="text-xs text-gray-500 mt-4">
        {app.os} • {app.size}
      </div>

      <div className="mt-6">
        {app.status === "ready" ? (
          <a
            href={app.downloadUrl}
            download
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
          >
            <Download className="w-5 h-5" />
            Tải bản mới nhất
          </a>
        ) : (
          <button
            disabled
            className="w-full py-3 rounded-xl bg-gray-700 text-gray-400 cursor-not-allowed"
          >
            ⏳ Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}