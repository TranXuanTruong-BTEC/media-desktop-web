import { APPS_DATA } from "./data/apps";
import AppCard from "./components/AppCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10">
          Ứng dụng Desktop miễn phí
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APPS_DATA.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}