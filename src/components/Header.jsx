import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-16 bg-black text-white flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold">
          T
        </div>
        <h1 className="text-lg font-semibold tracking-wide">TruckTracker</h1>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition ${
              isActive
                ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                : "hover:text-blue-400"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `transition ${
              isActive
                ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                : "hover:text-blue-400"
            }`
          }
        >
          History
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300 hidden sm:block">Admin</span>
        <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center">
          👤
        </div>
      </div>
    </header>
  );
}
