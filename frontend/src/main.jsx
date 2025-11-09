import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import News from "../pages/News.jsx";
import Weather from "./components/weather.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/news" element={<News />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
