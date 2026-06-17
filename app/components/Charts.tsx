"use client";

import { useEffect, useState } from "react";
import { getMachines } from "../../src/services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

interface Machine {
  id: number;
  machine_name: string;
  machine_type: string;
  location: string;
  temperature: number;
  vibration: number;
  status: string;
}

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function Charts() {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const loadMachines = async () => {
      try {
        const data = await getMachines();
        setMachines(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadMachines();
  }, []);

  const chartData = [
    {
      name: "Healthy",
      value: machines.filter((m) => m.status === "Healthy").length,
    },
    {
      name: "Maintenance",
      value: machines.filter((m) => m.status === "Maintenance Required").length,
    },
    {
      name: "Critical",
      value: machines.filter((m) => m.status === "Critical").length,
    },
  ];

  const temperatureData = machines.map((machine) => ({
    name: machine.machine_name,
    temperature: machine.temperature,
  }));

  return (
    <section className="mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Analytics</h2>

        <p className="text-slate-500 mt-2">
          Live machine health and temperature insights
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-xl font-bold text-slate-700 mb-6">
            Machine Status Distribution
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={4}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-xl font-bold text-slate-700 mb-6">
            Temperature Overview
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="temperature"
                radius={[10, 10, 0, 0]}
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
