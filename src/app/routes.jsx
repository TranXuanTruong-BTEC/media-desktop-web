import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import ToolDetail from "../pages/ToolDetail";
import React from "react";

function AppRoutes() {
  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool/:slug" element={<ToolDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default AppRoutes;