import { Link } from "react-router-dom";
import React from "react";
export default function NotFound() {
  return (
    <div style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        404 - Page Not Found
      </h1>

      <p style={{ marginBottom: "30px" }}>
        The page you are looking for does not exist.
      </p>

      <Link to="/" style={{ color: "#3b82f6" }}>
        Go back to Home
      </Link>
    </div>
  );
}