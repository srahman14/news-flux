import React from "react";
import WeatherSmall from "./components/WeatherSmall";
import NewsFeedSmall from "./components/NewsFeedSmall";
import CurrencySmall from "./components/CurrencySmall";
import Nasasmall from "./components/NasaSmall";
import CryptoSmall from "./components/CryptoSmall";

import { SunIcon, NewspaperIcon, DollarSign, Globe2 } from "lucide-react";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Hero / Title Section */}
      <header className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-2">
          Daily Dashboard
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Weather, News, Currency, Astronomy & Crypto at a glance
        </p>
      </header>

      {/* Top Row: 4 widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Weather */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-4 hover:scale-105 transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <SunIcon size={20} className="text-yellow-400" />
            <h2 className="text-xl font-semibold">Weather</h2>
          </div>
          <WeatherSmall />
        </div>

        {/* Currency */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-4 hover:scale-105 transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} className="text-green-400" />
            <h2 className="text-xl font-semibold">Currency</h2>
          </div>
          <CurrencySmall />
        </div>

        {/* Crypto */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-4 hover:scale-105 transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} className="text-green-400" />
            <h2 className="text-xl font-semibold">Crypto</h2>
          </div>
          <CryptoSmall />
        </div>

        {/* Astronomy */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-4 hover:scale-105 transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Globe2 size={20} className="text-purple-400" />
            <h2 className="text-xl font-semibold">Astronomy</h2>
          </div>
          <Nasasmall />
        </div>
      </div>

      {/* Bottom Row: News Headlines */}
      <div className="bg-gray-900 rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <NewspaperIcon size={20} className="text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Top Headlines</h2>
        </div>
        <NewsFeedSmall />
      </div>
    </div>
  );
};

export default App;