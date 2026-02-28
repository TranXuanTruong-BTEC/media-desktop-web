import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="font-bold text-xl">
          Media<span className="text-blue-500">Tools</span>
        </h1>

        <a
          href="https://github.com/TranXuanTruong-BTEC"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-white"
        >
          <Github />
        </a>
      </div>
    </nav>
  );
}