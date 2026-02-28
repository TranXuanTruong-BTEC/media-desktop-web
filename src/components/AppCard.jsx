import { Download, Monitor } from "lucide-react";

export default function AppCard({ app, onDownload }) {
  const Icon = app.icon;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex flex-col hover:border-gray-600 transition">
      <div className="flex justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${app.color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="text-right text-sm text-gray-400">
          <div>{app.version}</div>
          <div>{app.size}</div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{app.name}</h3>
      <p className="text-gray-400 text-sm flex-grow">{app.description}</p>

      <div className="mt-4 text-xs text-gray-500 flex items-center">
        <Monitor className="w-4 h-4 mr-1" />
        {app.os}
      </div>

      <a
        href={app.downloadUrl}
        download
        onClick={() => onDownload(app.name)}
        className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-700 hover:bg-blue-600 transition font-medium"
      >
        <Download className="w-5 h-5" />
        Tải về ngay
      </a>
    </div>
  );
}