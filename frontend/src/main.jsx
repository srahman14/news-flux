import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import News from "../pages/News.jsx";
import Weather from "./components/weather.jsx";
import CurrencyExchange from "./components/Currency.jsx"; // main currency page
import Nasa from "./components/Nasa.jsx"; // <-- import full NASA page

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Homepage with small previews */}
        <Route path="/" element={<App />} />

        {/* Full pages */}
        <Route path="/news" element={<News />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/currency" element={<CurrencyExchange />} />
        <Route path="/nasa" element={<Nasa />} /> {/* <-- full NASA page */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);