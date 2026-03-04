export default function ScreenshotSection({ screenshots }) {
  return (
    <section className="bg-slate-950 py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-16 text-center">
          Giao diện ứng dụng
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {screenshots.map((src, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden border border-slate-800"
            >
              <img
                src={src}
                alt={`Screenshot ${index + 1}`}
                className="w-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}