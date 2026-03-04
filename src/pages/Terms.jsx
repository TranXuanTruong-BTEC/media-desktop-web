import React from "react";
import SEO from "../components/SEO";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service | MediaTools"
        description="Read the Terms of Service for using MediaTools software and website."
      />

      <div className="max-w-4xl mx-auto px-6 py-16 text-gray-300">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4">
          By using MediaTools and downloading our software, you agree to the
          following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Usage</h2>
        <p className="mb-4">
          Our tools are provided free of charge for personal use. You may not
          redistribute or modify the software without permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. No Warranty</h2>
        <p className="mb-4">
          The software is provided "as is" without warranties of any kind.
          We are not responsible for any damages arising from its use.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Changes</h2>
        <p>
          We reserve the right to update these terms at any time.
        </p>
      </div>
    </>
  );
}