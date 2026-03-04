import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 text-white py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Bộ công cụ Desktop miễn phí cho Windows
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Nhanh. Nhẹ. Không quảng cáo. Không thu thập dữ liệu.
          Tải và sử dụng ngay các công cụ xử lý media hiệu suất cao.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/tools/yt2-downloader"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition"
          >
            Tải miễn phí
          </Link>

          <Link
            to="#tools"
            className="border border-slate-600 hover:border-slate-400 px-6 py-3 rounded-xl transition"
          >
            Xem công cụ
          </Link>
        </div>
      </div>
    </section>
  );
}