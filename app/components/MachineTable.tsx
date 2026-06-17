"use client";

import { useEffect, useState } from "react";
import { getMachines } from "../../src/services/api";
import SearchFilter from "./SearchFilter";

interface Machine {
  id: number;
  machine_name: string;
  machine_type: string;
  location: string;
  temperature: number;
  vibration: number;
  status: string;
}

export default function MachineTable() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const loadMachines = async () => {
      try {
        const data = await getMachines();
        setMachines(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMachines();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-100 text-green-700 border border-green-200";

      case "Maintenance Required":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";

      default:
        return "bg-red-100 text-red-700 border border-red-200";
    }
  };

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch = machine.machine_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || machine.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <section className="mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <div className="animate-pulse text-slate-500 text-xl">
            Loading machine data...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Machine Management
        </h2>

        <p className="text-slate-500 mt-2">
          Monitor and manage all machines in real time
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div className="overflow-x-auto rounded-2xl mt-8">
          <table className="min-w-full">
            <thead className="sticky top-0 bg-slate-800 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Machine</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Temperature</th>
                <th className="p-4 text-left">Vibration</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredMachines.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-16 text-slate-500 text-lg"
                  >
                    No machines found.
                  </td>
                </tr>
              ) : (
                filteredMachines.map((machine, index) => (
                  <tr
                    key={machine.id}
                    className={`transition-all duration-300 hover:bg-blue-50 hover:scale-[1.002] ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="p-5 font-medium">{machine.id}</td>

                    <td className="p-5 font-semibold text-slate-800">
                      {machine.machine_name}
                    </td>

                    <td className="p-5">{machine.machine_type}</td>

                    <td className="p-5">{machine.location}</td>

                    <td className="p-5 font-semibold text-blue-700">
                      {machine.temperature}°C
                    </td>

                    <td className="p-5">{machine.vibration}</td>

                    <td className="p-5">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                          machine.status,
                        )}`}
                      >
                        {machine.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
