"use client";

import { useEffect, useState } from "react";

import Sidebar from "./components/sidebar";
import DashboardCards from "./components/DashboardCards";
import MachineTable from "./components/MachineTable";
import Charts from "./components/Charts";

import { getHome } from "../src/services/api";

interface ApiResponse {
  success: boolean;
  message: string;
  version: string;
  status: string;
}

export default function Home() {
  const [apiData, setApiData] = useState<ApiResponse>({
    success: false,
    message: "Loading...",
    version: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHome();
        setApiData(data);
      } catch {
        setError("Unable to connect to MaintAI Backend.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <section className="flex-1 overflow-y-auto p-10">
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-slate-800">
            MaintAI Dashboard
          </h1>

          <p className="text-slate-500 text-xl mt-3">
            AI Powered Predictive Maintenance Platform
          </p>
        </div>

        {/* Dashboard Cards */}

        <DashboardCards />

        {/* Backend Information */}

        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center text-lg">
            Connecting to Backend...
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 rounded-2xl shadow-lg p-8 mt-8 text-center text-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-gray-500 uppercase text-sm">Message</h2>

              <p className="mt-4 text-2xl font-bold text-blue-700 break-words">
                {apiData.message}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-gray-500 uppercase text-sm">Version</h2>

              <p className="mt-4 text-2xl font-bold text-green-700">
                {apiData.version}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-gray-500 uppercase text-sm">Status</h2>

              <p className="mt-4 text-2xl font-bold text-purple-700">
                {apiData.status}
              </p>
            </div>
          </div>
        )}

        {/* Machine Table */}

        <div className="mt-10">
          <MachineTable />
        </div>

        {/* Charts */}

        <div className="mt-10">
          <Charts />
        </div>
      </section>
    </main>
  );
}
