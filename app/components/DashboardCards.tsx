"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "../../src/services/api";
import {
  FaIndustry,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
} from "react-icons/fa";

interface DashboardStats {
  total_machines: number;
  healthy: number;
  maintenance_required: number;
  critical: number;
}

export default function DashboardCards() {
  const [stats, setStats] = useState<DashboardStats>({
    total_machines: 0,
    healthy: 0,
    maintenance_required: 0,
    critical: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Machines",
      value: stats.total_machines,
      icon: <FaIndustry className="text-3xl text-blue-600" />,
      border: "border-blue-500",
      bg: "from-blue-50 to-white",
      text: "text-blue-700",
    },
    {
      title: "Healthy",
      value: stats.healthy,
      icon: <FaCheckCircle className="text-3xl text-green-600" />,
      border: "border-green-500",
      bg: "from-green-50 to-white",
      text: "text-green-700",
    },
    {
      title: "Maintenance",
      value: stats.maintenance_required,
      icon: <FaTools className="text-3xl text-yellow-500" />,
      border: "border-yellow-500",
      bg: "from-yellow-50 to-white",
      text: "text-yellow-600",
    },
    {
      title: "Critical",
      value: stats.critical,
      icon: <FaExclamationTriangle className="text-3xl text-red-600" />,
      border: "border-red-500",
      bg: "from-red-50 to-white",
      text: "text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.bg} rounded-2xl border-l-4 ${card.border} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase font-semibold">
                {card.title}
              </p>

              <h2 className={`text-5xl font-bold mt-5 ${card.text}`}>
                {card.value}
              </h2>
            </div>

            <div className="bg-white rounded-full p-4 shadow-md">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
