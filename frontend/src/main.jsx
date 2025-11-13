import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import News from "../pages/News.jsx";
import Weather from "./components/Weather.jsx";
import CurrencyExchange from "./components/Currency.jsx";
import Nasa from "./components/Nasa.jsx";
import Crypto from "./components/Crypto.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Homepage with small widgets */}
        <Route path="/" element={<App />} />

        {/* Full pages */}
        <Route path="/news" element={<News />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/currency" element={<CurrencyExchange />} />
        <Route path="/nasa" element={<Nasa />} />
        <Route path="/crypto" element={<Crypto />} /> {/* <-- full crypto page */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);