import React from "react";
import { Monitor } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppCard({ app }) {
  const Icon = app.icon || Monitor;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex flex-col 
                    hover:border-blue-500 hover:-translate-y-1 
                    transition-all duration-300">

      {/* CLICK AREA */}
      <Link to={`/tools/${app.id}`} className="flex-grow">
        <div className="flex justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${app.color || "from-gray-600 to-gray-800"}`}>
            <Icon className="w-7 h-7 text-white" />
          </div>

          <div className="text-right text-sm text-gray-400">
            <div>{app.version}</div>
            <div>{app.size}</div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">{app.name}</h3>
        <p className="text-gray-400 text-sm mb-4">
          {app.description}
        </p>

        <div className="text-xs text-gray-500 flex items-center">
          <Monitor className="w-4 h-4 mr-1" />
          {app.os}
        </div>
      </Link>

      {/* ACTION BUTTON */}
      <Link
        to={`/tools/${app.id}`}
        className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl 
                   bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:opacity-90 transition font-medium"
      >
        Xem chi tiết
      </Link>
    </div>
  );
}