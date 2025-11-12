import React from "react";
import WeatherSmall from "./components/WeatherSmall";
import NewsFeedSmall from "./components/NewsFeedSmall";
import CurrencySmall from "./components/CurrencySmall";
import Nasasmall from "./components/Nasasmall";

import { SunIcon, NewspaperIcon, DollarSign, Globe2 } from "lucide-react";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* Hero / Title Section */}
      <header className="text-center py-10 px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-2">
          Daily Dashboard
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Weather, News, Currency & Astronomy at a glance
        </p>
      </header>

      {/* Dashboard Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 pb-12">

        {/* Weather Panel */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <SunIcon size={20} className="text-yellow-400" />
            <h2 className="text-xl font-semibold">Weather</h2>
          </div>
          <WeatherSmall />
        </div>

        {/* News Panel */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <NewspaperIcon size={20} className="text-blue-400" />
            <h2 className="text-xl font-semibold">News</h2>
          </div>
          <NewsFeedSmall />
        </div>

        {/* Currency Panel */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={20} className="text-green-400" />
            <h2 className="text-xl font-semibold">Currency</h2>
          </div>
          <CurrencySmall />
        </div>

        {/* NASA Panel */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transform transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Globe2 size={20} className="text-purple-400" />
            <h2 className="text-xl font-semibold">Astronomy</h2>
          </div>
          <Nasasmall />
        </div>

      </div>
    </div>
  );
};

export default App;