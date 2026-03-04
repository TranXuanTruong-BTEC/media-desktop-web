import { Link } from "react-router-dom";
import React from "react";
function Navbar() {
  return (
    <header className="py-6 border-b border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <Link to="/" className="text-xl font-semibold">
          Media<span className="text-blue-400">Tools</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;