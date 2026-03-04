import React from "react";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-bold hover:opacity-80 transition"
        >
          Media<span className="text-blue-400">Tools</span>
        </Link>

        {/* Github */}
        <a
          href="https://github.com/TranXuanTruong-BTEC"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-white transition"
        >
          <Github className="w-5 h-5" />
        </a>

      </div>
    </nav>
  );
}