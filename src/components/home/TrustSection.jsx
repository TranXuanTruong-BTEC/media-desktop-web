export default function TrustSection() {
  const items = [
    { title: "100%", desc: "Miễn phí" },
    { title: "0", desc: "Quảng cáo" },
    { title: "Windows", desc: "10/11" },
    { title: "Cập nhật", desc: "Thường xuyên" },
  ];

  return (
    <section className="bg-slate-900 py-14 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {items.map((item, index) => (
          <div key={index}>
            <div className="text-2xl font-bold text-white">
              {item.title}
            </div>
            <div className="text-slate-400 mt-1 text-sm">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}