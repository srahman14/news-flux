import React from "react";
import WeatherSmall from "./components/WeatherSmall";
import NewsFeedSmall from "./components/NewsFeedSmall";
import CurrencySmall from "./components/CurrencySmall";
import Nasasmall from "./components/NasaSmall";
import CryptoSmall from "./components/CryptoSmall";

import {
  SunIcon,
  NewspaperIcon,
  DollarSign,
  Globe2,
  Gem,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Hero / Title Section */}
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-2">
            Daily Dashboard
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Weather, News, Currency, Astronomy & Crypto at a glance
          </p>
        </header>

        {/* Top Row: 3 widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Weather */}
          <div className="bg-neutral-900 rounded-xl p-4 hover:scale-105 transform transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <SunIcon size={20} className="text-yellow-400" />
              <h2 className="text-xl font-semibold">Weather</h2>
            </div>
            <WeatherSmall />
          </div>

          {/* Currency */}
          <div className="bg-neutral-900 rounded-xl p-4 hover:scale-105 transform transition-all duration-300">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex justify-center items-center gap-2">
                <DollarSign size={20} className="text-green-400" />
                <h2 className="text-xl font-semibold">Currency</h2>
              </div>
              <div>
                <Link
                  to={"/currency"}
                  className="mt-3 cursor-pointer bg-neutral text-white text-base px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100/10 transition"
                >
                  Exchange <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <CurrencySmall />
          </div>

          {/* Crypto */}
          <div className="bg-neutral-900 rounded-xl p-4 hover:scale-105 transform transition-all duration-300">
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-row items-center gap-2 justify-center">
                <Gem size={22} className="text-orange-400" />
                <h2 className="text-xl font-semibold">Crypto</h2>
              </div>
              <div className="">
                <Link
                  to={"/crypto"}
                  className="mt-3 cursor-pointer bg-neutral text-white text-base px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100/10 transition"
                >
                  Crypto <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <CryptoSmall />
          </div>
        </div>

        {/* Bottom Row: News Headlines */}
        <div className="bg-neutral-900 rounded-xl shadow-lg p-4 flex flex-col md:flex-row">
          <div className="flex flex-col p-2 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <NewspaperIcon size={20} className="text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Top Headlines
              </h2>
            </div>
            <NewsFeedSmall />
          </div>

          {/* Astronomy */}
          <div className="rounded-xl p-4 hover:scale-105 transform transition-all duration-300 flex flex-col flex-2">
            <div className="flex items-center gap-2 mb-2">
              <Globe2 size={20} className="text-purple-400" />
              <h2 className="text-xl font-semibold">Astronomy</h2>
            </div>
            <Nasasmall />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
