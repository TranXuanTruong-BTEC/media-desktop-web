import React from "react";
import SEO from "../components/SEO";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | MediaTools"
        description="Read our privacy policy. We do not collect or store personal data."
      />

      <div className="max-w-4xl mx-auto px-6 py-16 text-gray-300">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          MediaTools respects your privacy. We do not collect, store, or share
          any personal data from users.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Data Collection</h2>
        <p className="mb-4">
          Our applications do not collect personal information or track user activity.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Third-Party Services</h2>
        <p className="mb-4">
          We may provide download links hosted on third-party platforms such as GitHub.
          These platforms may have their own privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Changes</h2>
        <p>
          We may update this Privacy Policy in the future. Updates will be posted on this page.
        </p>
      </div>
    </>
  );
}