import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { tools } from "../data/tools";
import React from "react";
function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">

      <Helmet>
        <title>MediaTools - Công cụ Desktop miễn phí</title>
        <meta
          name="description"
          content="Tổng hợp các phần mềm desktop miễn phí, không quảng cáo."
        />
      </Helmet>

      {/* HERO */}
      <section className="text-center py-28 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Khám phá các Công cụ Desktop
        </motion.h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Tuyển tập các phần mềm desktop miễn phí do cá nhân phát triển.
        </p>
      </section>

      {/* TOOLS */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 pb-20">
        {tools.map((tool) => (
          <motion.div
            key={tool.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/tool/${tool.slug}`}
              className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-2xl p-6 block hover:scale-105 transition"
            >
              <img
                src={tool.image}
                alt={tool.name}
                className="rounded-lg mb-4 w-full aspect-video object-cover"
              />

              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>

              <span className="text-blue-400">View Details →</span>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

export default Home;