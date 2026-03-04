import React from "react";
import { APPS_DATA } from "../data/apps";
import AppCard from "../components/AppCard";
import Hero from "../components/Hero";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="MediaTools - Free Desktop Utilities"
        description="Download free desktop tools like YouTube Downloader. Fast, lightweight and secure."
      />

      <Hero />

      <section id="apps" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APPS_DATA.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>
    </>
  );
}