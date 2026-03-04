import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppCard({ app }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg"
    >
      {/* Screenshot */}
      {app.screenshot && (
        <img
          src={app.screenshot}
          alt={app.name}
          className="rounded-xl mb-4 border border-gray-700"
        />
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">
        {app.name}
      </h2>

      {/* Description */}
      <p className="text-gray-400 mb-4">
        {app.description}
      </p>

      {/* Button */}
      <Link
        to={`/tools/${app.id}`}
        className="inline-block mt-auto text-blue-400 hover:text-blue-300 font-medium"
      >
        View Details →
      </Link>
    </motion.div>
  );
}