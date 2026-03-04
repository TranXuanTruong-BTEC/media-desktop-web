import { tools } from "../../data/tools";
import AppCard from "../shared/AppCard";

export default function FeaturedTools() {
  return (
    <section id="tools" className="bg-slate-950 py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Công cụ nổi bật
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {tools.map((tool) => (
            <AppCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}