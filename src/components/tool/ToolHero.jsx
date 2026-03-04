import { Link } from "react-router-dom";

export default function ToolHero({ tool }) {
  return (
    <section className="bg-slate-950 py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <div className="text-5xl mb-6">
            {tool.icon || "🛠"}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {tool.name}
          </h1>

          <p className="mt-6 text-slate-400 text-lg leading-relaxed">
            {tool.description}
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <a
              href={tool.download}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition"
            >
              Tải miễn phí
            </a>

            <Link
              to="/"
              className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-xl transition"
            >
              ← Quay lại
            </Link>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="text-sm text-slate-400 space-y-3">
            <div>Phiên bản: <span className="text-white">{tool.version}</span></div>
            <div>Hệ điều hành: <span className="text-white">{tool.os}</span></div>
            <div>Dung lượng: <span className="text-white">{tool.size}</span></div>
            <div>Cập nhật: <span className="text-white">{tool.updated}</span></div>
          </div>
        </div>

      </div>
    </section>
  );
}