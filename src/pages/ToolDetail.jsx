import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { APPS_DATA } from "../data/apps";
import Toast from "../components/Toast";
import SEO from "../components/SEO";

export default function ToolDetail() {
  const { id } = useParams();
  const app = APPS_DATA.find((a) => a.id === id);

  const [toast, setToast] = useState(null);

  if (!app) {
    return (
      <div className="text-center py-20 text-gray-400">
        Tool not found.
      </div>
    );
  }

  const handleDownload = () => {
    setToast({ type: "loading", message: "Preparing download..." });

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = app.downloadUrl;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setToast({
        type: "success",
        message: "Download started successfully!",
      });

      setTimeout(() => setToast(null), 3000);
    }, 800);
  };

  return (
    <>
      <SEO
        title={`${app.name} | MediaTools`}
        description={app.description}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg">

          {/* Screenshot */}
          {app.screenshot && (
            <motion.img
              src={app.screenshot}
              alt={app.name}
              className="rounded-xl mb-8 border border-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{app.name}</h1>

          {/* Description */}
          <p className="text-gray-400 mb-6">{app.description}</p>

          {/* Info */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8 text-sm text-gray-300">
            {app.version && (
              <div>
                <strong>Version:</strong> {app.version}
              </div>
            )}
            {app.size && (
              <div>
                <strong>Size:</strong> {app.size}
              </div>
            )}
            {app.os && (
              <div>
                <strong>OS:</strong> {app.os}
              </div>
            )}
          </div>

          {/* Features */}
          {app.features && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Features
              </h2>

              <ul className="space-y-2 text-gray-400">
                {app.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    • {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Download Button */}
          {!app.isComingSoon && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-medium"
            >
              Download Now
            </motion.button>
          )}

          {app.isComingSoon && (
            <div className="text-yellow-400 font-medium">
              Coming Soon 🚀
            </div>
          )}
        </div>
      </motion.div>

      {toast && <Toast toast={toast} />}
    </>
  );
}