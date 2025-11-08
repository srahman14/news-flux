import { NewspaperIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-20 p-9 text-white flex justify-between items-center bg-black border border-l-0 border-r-0 border-t-0 border-b-2 border-gray-200/20">
      <div className="flex gap-2 items-center">
        <NewspaperIcon />
        <Link
          to={"/"}
          className="dark:text-white text-black font-bold text-2xl tracking-tighter"
        >
          newsflux
        </Link>
      </div>
      <div>
        <ul className="flex gap-4 font-semibold">
          <Link
            to={"/news"}
            className="cursor-pointer bg-gray-300/10 rounded-md hover:bg-gray-300/20 duration-300 transition-all ease-in-out  p-2"
          >
            News
          </Link>
          <li className="cursor-pointer bg-gray-300/10 rounded-md hover:bg-gray-300/20 duration-300 transition-all ease-in-out  p-2">
            Weather
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
