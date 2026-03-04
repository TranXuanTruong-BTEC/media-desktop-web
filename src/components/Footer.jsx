import React from "react"
import { Link } from "react-router-dom";


export default function Footer() {
  return (
<footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
  <div className="space-x-6">
    <Link to="/privacy" className="hover:text-white transition">
      Privacy Policy
    </Link>

    <Link to="/terms" className="hover:text-white transition">
      Terms of Service
    </Link>
  </div>

  <p className="mt-4">
    © {new Date().getFullYear()} MediaTools. All rights reserved.
  </p>
</footer>
  );
}