import { useState } from "react";
import { APPS_DATA } from "./data/apps";
import AppCard from "./components/AppCard";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

export default function App() {
  const [toast, setToast] = useState(null);

  const handleDownload = (name) => {
    setToast({ type: "loading", message: `Đang tải ${name}...` });
    setTimeout(() => {
      setToast({ type: "success", message: `Đã bắt đầu tải ${name}` });
      setTimeout(() => setToast(null), 3000);
    }, 800);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <Hero />

      <section id="apps" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APPS_DATA.map(app => (
            <AppCard
              key={app.id}
              app={app}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </section>

      <Footer />
      {toast && <Toast toast={toast} />}
    </div>
  );
}