export default function SystemInfo({ requirements }) {
  return (
    <section className="bg-slate-900 py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-2xl font-bold mb-10">
          Yêu cầu hệ thống
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {requirements.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 p-6 rounded-xl"
            >
              <h3 className="font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {item.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}