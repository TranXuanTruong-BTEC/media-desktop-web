import { Link } from "react-router-dom";

export default function AppCard({ tool }) {
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1">

      {/* Icon */}
      <div className="text-4xl mb-4">
        {tool.icon || "🛠"}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-slate-400 mt-3 text-sm leading-relaxed">
        {tool.description}
      </p>

      {/* Meta */}
      <div className="mt-4 text-xs text-slate-500">
        v{tool.version} • {tool.os}
      </div>

      {/* CTA */}
      <Link
        to={`/tools/${tool.slug}`}
        className="inline-block mt-6 text-blue-400 group-hover:text-blue-300 transition font-medium text-sm"
      >
        View Details →
      </Link>
    </div>
  );
}