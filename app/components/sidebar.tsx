"use client";

import {
  FaChartPie,
  FaIndustry,
  FaChartLine,
  FaCog,
  FaCircle,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white flex flex-col justify-between shadow-2xl">
      {/* Logo */}
      <div>
        <div className="px-8 py-8 border-b border-slate-800">
          <h1 className="text-4xl font-extrabold tracking-wide text-blue-400">
            MaintAI
          </h1>

          <p className="text-sm text-slate-400 mt-2">Predictive Maintenance</p>
        </div>

        {/* Navigation */}

        <nav className="px-5 py-8 space-y-3">
          <button className="flex items-center gap-4 w-full rounded-xl bg-blue-600 px-5 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02]">
            <FaChartPie />
            Dashboard
          </button>

          <button className="flex items-center gap-4 w-full rounded-xl px-5 py-4 text-lg transition-all duration-300 hover:bg-slate-800 hover:translate-x-1">
            <FaIndustry />
            Machines
          </button>

          <button className="flex items-center gap-4 w-full rounded-xl px-5 py-4 text-lg transition-all duration-300 hover:bg-slate-800 hover:translate-x-1">
            <FaChartLine />
            Analytics
          </button>

          <button className="flex items-center gap-4 w-full rounded-xl px-5 py-4 text-lg transition-all duration-300 hover:bg-slate-800 hover:translate-x-1">
            <FaCog />
            Settings
          </button>
        </nav>
      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <FaCircle className="text-green-500 text-xs" />

          <span className="text-sm text-slate-300">Backend Connected</span>
        </div>

        <p className="text-xs text-slate-500">MaintAI Dashboard v1.0.0</p>
      </div>
    </aside>
  );
}
