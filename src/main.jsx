import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import ScrollTop from "./components/layout/ScrollTop";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);