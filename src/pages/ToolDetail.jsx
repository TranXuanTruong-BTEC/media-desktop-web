import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { tools } from "../data/tools";
import React, { useEffect, useState } from "react";

function ToolDetail() {
  const { slug } = useParams();
  const tool = tools.find((t) => t.slug === slug);

  const [version, setVersion] = useState(tool?.version || "...");
  const [downloadUrl, setDownloadUrl] = useState(tool?.downloadUrl || "");
  const [size, setSize] = useState(tool?.size || "...");

  useEffect(() => {
    if (!tool || tool.slug !== "yt2-downloader") return;

    async function fetchData() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/TranXuanTruong-BTEC/media-desktop-app/releases/latest"
        );
        const data = await res.json();

        const exeFile = data.assets.find((file) =>
          file.name.endsWith(".exe")
        );

        setVersion(data.tag_name);
        setDownloadUrl(exeFile?.browser_download_url || tool.downloadUrl);

        const fileSizeMB = (exeFile.size / 1024 / 1024).toFixed(1);
        setSize(fileSizeMB + " MB");
      } catch (err) {
        setVersion("N/A");
        setSize("N/A");
      }
    }

    fetchData();
  }, [tool]);

  if (!tool) return <div className="p-20">Not Found</div>;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = tool.name;
    link.click();
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-20 min-h-screen">
      <Helmet>
        <title>
          {tool.status === "released"
            ? `${tool.name} - Download miễn phí`
            : `${tool.name} - Coming Soon`}
        </title>
        <meta name="description" content={tool.description} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-slate-800/50 border border-white/10 rounded-2xl p-10"
      >
        <img
          src={tool.image}
          alt={tool.name}
          className="rounded-lg mb-8 w-full aspect-video object-cover"
        />

        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold">{tool.name}</h1>

          {tool.status === "coming-soon" && (
            <span className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
              Beta
            </span>
          )}
        </div>

        <p className="text-gray-400 mb-6">{tool.description}</p>

        {/* 🔥 REAL DATA */}
        <div className="flex gap-8 text-sm text-gray-300 mb-8">
          <span>🚀 Version: {version}</span>
          <span>📦 Size: {size}</span>
          <span>OS: {tool.os}</span>
        </div>

        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-8">
          {tool.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        {tool.status === "released" ? (
          <button
            onClick={handleDownload}
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition transform hover:scale-105"
          >
            Download Now
          </button>
        ) : (
          <div className="inline-flex items-center gap-3">
            <span className="px-4 py-2 bg-yellow-500/20 text-yellow-400 text-sm font-medium rounded-full border border-yellow-500/30">
              🚧 Coming Soon
            </span>

            <button
              disabled
              className="px-6 py-3 bg-gray-600 text-gray-300 rounded-lg cursor-not-allowed opacity-70"
            >
              In Development
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ToolDetail;