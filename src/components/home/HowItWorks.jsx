export default function HowItWorks() {
  const steps = [
    "Tải ứng dụng về máy",
    "Mở ứng dụng và nhập dữ liệu",
    "Xử lý và lưu kết quả trong vài giây"
  ];

  return (
    <section className="bg-slate-950 py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-16">
          Cách hoạt động
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-900 p-8 rounded-2xl border border-slate-800"
            >
              <div className="text-3xl font-bold text-blue-500 mb-4">
                {index + 1}
              </div>
              <p className="text-slate-300">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}