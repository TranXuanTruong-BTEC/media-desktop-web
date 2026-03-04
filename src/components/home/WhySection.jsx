export default function WhySection() {
  const features = [
    {
      title: "Tối ưu hiệu suất native",
      desc: "Ứng dụng desktop chạy trực tiếp trên Windows, nhanh và ổn định."
    },
    {
      title: "Không thu thập dữ liệu",
      desc: "Chúng tôi không lưu trữ hay theo dõi bất kỳ thông tin cá nhân nào."
    },
    {
      title: "Nhẹ và dễ cài đặt",
      desc: "Dung lượng nhỏ, cài đặt trong vài giây."
    },
    {
      title: "Thiết kế tập trung trải nghiệm",
      desc: "Giao diện tối giản, dễ sử dụng cho mọi đối tượng."
    }
  ];

  return (
    <section className="bg-slate-900 py-24 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Vì sao chọn MediaTools?
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <h3 className="font-semibold text-lg mb-2">
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