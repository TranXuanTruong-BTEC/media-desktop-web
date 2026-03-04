import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { tools } from "../data/tools";
import React from "react";
function ToolDetail() {
  const { slug } = useParams();
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) return <div className="p-20">Not Found</div>;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-20 min-h-screen">
      <Helmet>
        <title>{tool.name} - Download miễn phí</title>
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

        <h1 className="text-3xl font-bold mb-4">{tool.name}</h1>
        <p className="text-gray-400 mb-6">{tool.description}</p>

        <div className="flex gap-8 text-sm text-gray-300 mb-8">
          <span>Version: {tool.version}</span>
          <span>Size: {tool.size}</span>
          <span>OS: {tool.os}</span>
        </div>

        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-8">
          {tool.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

<button
  onClick={() => {
    const link = document.createElement("a");
    link.href = tool.downloadUrl;
    link.download = tool.name;
    link.click();
  }}
  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition transform hover:scale-105"
>
  Download Now
</button>
      </motion.div>
    </div>
  );
}

export default ToolDetail;