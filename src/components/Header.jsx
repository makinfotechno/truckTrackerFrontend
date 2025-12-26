import React from "react";

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
        <a href="/" className="hover:text-blue-400 transition">
          Dashboard
        </a>
        {/* <a href="/table2" className="hover:text-blue-400 transition">
          Table 2
        </a> */}
        <a href="#" className="hover:text-blue-400 transition">
          Reports
        </a>
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
