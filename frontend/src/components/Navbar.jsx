import React from "react";
import { Link } from "react-router-dom";
import { NewspaperIcon, SunIcon, DollarSign } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-20 p-6 flex justify-between items-center bg-black border-b-2 border-gray-200/20">
      {/* Logo / Home */}
      <div className="flex items-center gap-2">
        <NewspaperIcon size={24} className="text-white" />
        <Link
          to="/"
          className="text-white font-bold text-2xl tracking-tight hover:text-gray-300 transition"
        >
          newsflux
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 font-semibold">
        <Link
          to="/news"
          className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-700 transition text-white"
        >
          <NewspaperIcon size={16} /> News
        </Link>

        <Link
          to="/weather"
          className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-700 transition text-white"
        >
          <SunIcon size={16} /> Weather
        </Link>

        <Link
          to="/currency"
          className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-700 transition text-white"
        >
          <DollarSign size={16} /> Currency
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;