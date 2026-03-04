import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 px-6 text-white">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Sẵn sàng trải nghiệm?
        </h2>

        <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
          Tải ngay công cụ miễn phí và xử lý media nhanh chóng trên máy tính của bạn.
        </p>

        <div className="mt-8">
          <Link
            to="/tools/yt2-downloader"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
          >
            Tải miễn phí ngay
          </Link>
        </div>

      </div>
    </section>
  );
}