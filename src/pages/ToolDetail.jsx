import React from "react";
import { useParams } from "react-router-dom";
import { Download, Monitor, ShieldCheck } from "lucide-react";
import { APPS_DATA } from "../data/apps"; // sửa path nếu khác

export default function ToolDetail() {
  const { id } = useParams();

  const app = APPS_DATA.find(app => app.id === id);

  if (!app) {
    return (
      <div className="text-white text-center py-20">
        App not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      {/* HERO */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {app.name}
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          {app.description}
        </p>

        <div className="flex justify-center gap-6 text-sm text-gray-500 mb-8">
          <span>{app.version}</span>
          <span>•</span>
          <span>{app.size}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Monitor className="w-4 h-4" />
            {app.os}
          </span>
        </div>

        <a
          href={app.downloadUrl}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl 
                     bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:opacity-90 transition font-medium shadow-lg"
        >
          <Download className="w-5 h-5" />
          Download cho Windows
        </a>
      </div>

      {/* SCREENSHOT */}
      {app.screenshot && (
        <div className="mb-20">
          <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6">
            <img
              src={app.screenshot}
              alt="App Screenshot"
              className="rounded-2xl shadow-xl mx-auto"
            />
          </div>
        </div>
      )}

      {/* FEATURES */}
      {app.features && (
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Tính năng nổi bật
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {app.features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6"
              >
                <p className="text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRIVACY */}
      <div className="mb-20">
        <div className="bg-gray-800/40 border border-gray-700 rounded-3xl p-10 text-center">
          <ShieldCheck className="w-10 h-10 mx-auto text-green-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">
            An toàn & Quyền riêng tư
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ứng dụng hoạt động hoàn toàn chạy local, không thu thập dữ liệu,
            không quảng cáo và không gửi thông tin người dùng lên server.
          </p>
        </div>
      </div>

    </div>
  );
}