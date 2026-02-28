export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Khám phá các{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Công cụ Desktop
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-400">
          Tuyển tập các phần mềm desktop miễn phí do cá nhân phát triển.  
          Không quảng cáo, không thu phí, tải về dùng ngay.
        </p>

        <div className="mt-10">
          <a
            href="#apps"
            className="inline-flex items-center px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-lg shadow-blue-600/30"
          >
            Xem ứng dụng
          </a>
        </div>
      </div>
    </section>
  );
}