import React from "react";
import { useParams } from "react-router-dom";
import { APPS_DATA } from "../data/apps";

export default function ToolDetail() {
  const { id } = useParams();

  const tool = APPS_DATA.find(app => app.id === id);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{tool.name}</h1>
      <p className="text-gray-400 mb-6">{tool.description}</p>

      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
        Download
      </button>
    </div>
  );
}