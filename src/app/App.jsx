import { Routes, Route } from "react-router-dom";
import React from "react";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-5xl font-bold mb-6">
          Media Desktop Tools
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Công cụ quản lý & tối ưu media chuyên nghiệp
        </p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
          Bắt đầu ngay
        </button>
      </div>
    </div>
  );
}

export default App;