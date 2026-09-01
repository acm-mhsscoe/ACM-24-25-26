"use client";

import React from "react";
import { Trophy, Code2, Cpu, Users, Award, CheckCircle2 } from "lucide-react";
import { SIH_STATS } from "@/constants/sihData";

export default function SihStats() {
  const stats = [
    {
      title: "Total Evaluated",
      value: `${SIH_STATS.totalRegisteredTeams} Teams`,
      subtitle: `${SIH_STATS.totalParticipants}+ Student participants`,
      icon: <Users className="text-blue-600" size={24} />,
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-200/60",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      title: "Nominated for Nationals",
      value: `${SIH_STATS.nominatedTeams} Teams`,
      subtitle: "Official MHSSCE Representation",
      icon: <Trophy className="text-amber-500" size={24} />,
      bgGradient: "from-amber-500/10 to-orange-500/10",
      borderColor: "border-amber-200/60",
      badgeColor: "bg-amber-100 text-amber-800",
    },
    {
      title: "Software Edition",
      value: `${SIH_STATS.softwareNominated} Teams`,
      subtitle: "AI, Web3, Cloud & Mobile",
      icon: <Code2 className="text-emerald-600" size={24} />,
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-200/60",
      badgeColor: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Hardware Edition",
      value: `${SIH_STATS.hardwareNominated} Teams`,
      subtitle: "IoT, Robotics & CleanTech",
      icon: <Cpu className="text-purple-600" size={24} />,
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-200/60",
      badgeColor: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-2xl bg-white border ${stat.borderColor} shadow-lg shadow-gray-100/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group`}
        >
          <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${stat.bgGradient} rounded-bl-full -z-0 opacity-80 group-hover:scale-110 transition-transform duration-300`} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                {stat.icon}
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.badgeColor}`}>
                SIH 2024
              </span>
            </div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              {stat.title}
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              {stat.value}
            </h3>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
              <span>{stat.subtitle}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
