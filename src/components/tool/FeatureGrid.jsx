export default function FeatureGrid({ features }) {
  return (
    <section className="bg-slate-900 py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-16 text-center">
          Tính năng nổi bật
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-blue-500 transition"
            >
              <div className="text-3xl mb-4">
                {feature.icon || "⚡"}
              </div>

              <h3 className="font-semibold mb-2">
                {feature.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}