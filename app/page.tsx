"use client";

import { useEffect, useState } from "react";

// ------------------------------------
// Types
// ------------------------------------

interface ApiResponse {
  success: boolean;
  message: string;
  version: string;
  status: string;
}

// ------------------------------------
// Home Page
// ------------------------------------

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
    const fetchAPI = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/");

        if (!response.ok) {
          throw new Error("Failed to fetch API");
        }

        const data: ApiResponse = await response.json();

        setApiData(data);
      } catch (err) {
        setError("Unable to connect to MaintAI Backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl p-10 w-[500px]">
        <h1 className="text-4xl font-bold text-center text-blue-700">
          MaintAI Dashboard
        </h1>

        <div className="mt-10">
          {loading ? (
            <p className="text-center">Connecting to Backend...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <>
              <p>
                <strong>Message :</strong>

                {apiData.message}
              </p>

              <p className="mt-3">
                <strong>Version :</strong>

                {apiData.version}
              </p>

              <p className="mt-3">
                <strong>Status :</strong>

                {apiData.status}
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
