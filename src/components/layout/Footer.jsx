import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            MediaTools
          </h3>
          <p className="text-sm">
            Bộ công cụ desktop miễn phí cho Windows.
            Nhanh, nhẹ và không quảng cáo.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Điều hướng
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/#tools" className="hover:text-white transition">
                Công cụ
              </Link>
            </li>
            <li>
              <Link to="/#faq" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Liên hệ
          </h4>
          <p className="text-sm">
            Email: support@mediatools.dev
          </p>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} MediaTools.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}