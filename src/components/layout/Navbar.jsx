import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/#tools" },
    { name: "FAQ", path: "/#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/70 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          MediaTools
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-slate-300">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-white transition ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <Link
            to="/tools/yt2-downloader"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Download
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-6 space-y-4 text-slate-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/tools/yt2-downloader"
            onClick={() => setOpen(false)}
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Download
          </Link>
        </div>
      )}
    </header>
  );
}