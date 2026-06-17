"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
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
    const loadData = async () => {
      try {
        const data = await getHome();
        setApiData(data);
      } catch (error) {
        setError("Unable to connect to MaintAI Backend.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen flex bg-slate-100">
      <Sidebar />

      <section className="flex-1 p-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-slate-800">
            MaintAI Dashboard
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            AI Powered Predictive Maintenance Platform
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center text-lg">
            Connecting to Backend...
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 rounded-2xl shadow-lg p-10 text-center text-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-gray-500 text-sm uppercase">Message</h2>

              <p className="mt-4 text-2xl font-bold text-blue-700">
                {apiData.message}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-gray-500 text-sm uppercase">Version</h2>

              <p className="mt-4 text-2xl font-bold text-green-600">
                {apiData.version}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-gray-500 text-sm uppercase">Status</h2>

              <p className="mt-4 text-2xl font-bold text-purple-600">
                {apiData.status}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
