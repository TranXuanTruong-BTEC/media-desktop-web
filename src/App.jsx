import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ToolDetail from "./pages/ToolDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/:id" element={<ToolDetail />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;