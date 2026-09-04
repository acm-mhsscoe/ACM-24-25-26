"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  X,
  Code2,
  Cpu,
  Download,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  SIH_CONFIRMED_DATA,
  SIH_WAITING_DATA,
  SIH_ALL_RESULTS,
} from "@/constants/sihData";

export default function SihResultsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("confirmed"); // "confirmed" | "waiting" | "all"
  const [categoryFilter, setCategoryFilter] = useState("All"); // "All" | "Software" | "Hardware"

  const displayedTeams = useMemo(() => {
    let sourceData = SIH_ALL_RESULTS;
    if (activeTab === "confirmed") sourceData = SIH_CONFIRMED_DATA;
    if (activeTab === "waiting") sourceData = SIH_WAITING_DATA;

    return sourceData.filter((team) => {
      if (categoryFilter !== "All" && team.category !== categoryFilter) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = team.teamName.toLowerCase().includes(query);
        const matchesLeader = team.leaderName.toLowerCase().includes(query);
        const matchesBranch = team.branch.toLowerCase().includes(query);
        const matchesPsId = team.psId.toLowerCase().includes(query);
        const matchesOrg = team.hostOrg.toLowerCase().includes(query);
        const matchesPs = team.problemStatement.toLowerCase().includes(query);
        const matchesMentor = team.mentor?.toLowerCase().includes(query);

        if (
          !matchesName &&
          !matchesLeader &&
          !matchesBranch &&
          !matchesPsId &&
          !matchesOrg &&
          !matchesPs &&
          !matchesMentor
        ) {
          return false;
        }
      }
      return true;
    });
  }, [activeTab, categoryFilter, searchQuery]);

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-20 overflow-hidden bg-slate-50/60">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/grid.svg")',
            backgroundSize: "30px 30px",
            opacity: "0.5",
          }}
        />
      </div>

      <div className="container relative z-10 px-3 sm:px-4 mx-auto max-w-5xl">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8 text-center"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-[11px] sm:text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Registration Closed • Results Announced
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Internal SIH <span className="text-[#007bff]">Results</span>
          </h1>

          <p className="mt-2.5 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed px-1">
            Congratulations to all the nominated and waiting list teams representing{" "}
            <span className="font-semibold text-gray-900">
              M. H. Saboo Siddik College of Engineering
            </span>{" "}
            for Smart India Hackathon! 🚀
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2.5 text-[11px] sm:text-xs text-gray-500 px-1">
            <span>
              Convenor: <strong className="text-gray-700">Dr. Zainab Mirza</strong>
            </span>
            <span>•</span>
            <span>
              Principal: <strong className="text-gray-700">Dr. Shafi Pathan</strong>
            </span>
          </div>

          {/* Action Bar */}
          <div className="mt-4 flex justify-center">
            <a
              href="/sih-results.pdf"
              download="ISIH-Confirmed-and-Waiting-Results.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#007bff] hover:bg-blue-600 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Download size={14} />
              <span>Download Result PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Clean Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden"
        >
          {/* Top Tabs Grid (Guaranteed single-line responsive) */}
          <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50/60 pt-1.5 px-1.5 sm:px-3">
            <button
              onClick={() => setActiveTab("confirmed")}
              className={`flex items-center justify-center gap-1.5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap text-center ${
                activeTab === "confirmed"
                  ? "border-[#007bff] text-[#007bff] bg-white rounded-t-lg sm:rounded-t-xl"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <CheckCircle2 size={14} className="hidden sm:block text-[#007bff] flex-shrink-0" />
              <span className="hidden sm:inline">Confirmed List</span>
              <span className="sm:hidden">Confirmed</span>
            </button>

            <button
              onClick={() => setActiveTab("waiting")}
              className={`flex items-center justify-center gap-1.5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap text-center ${
                activeTab === "waiting"
                  ? "border-amber-500 text-amber-700 bg-white rounded-t-lg sm:rounded-t-xl"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <Clock size={14} className="hidden sm:block text-amber-600 flex-shrink-0" />
              <span className="hidden sm:inline">Waiting List</span>
              <span className="sm:hidden">Waiting</span>
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center justify-center py-2.5 sm:py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap text-center ${
                activeTab === "all"
                  ? "border-gray-800 text-gray-900 bg-white rounded-t-lg sm:rounded-t-xl"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <span className="hidden sm:inline">All Teams</span>
              <span className="sm:hidden">All</span>
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="p-3 sm:p-4 bg-white border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search team, leader, PS ID, branch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-7 py-2 text-xs sm:text-sm bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category Filter Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] cursor-pointer"
              >
                <option value="All">All Editions</option>
                <option value="Software">Software Edition</option>
                <option value="Hardware">Hardware Edition</option>
              </select>
            </div>
          </div>

          {/* Desktop & Tablet Table View (md and above) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-14 text-center">#</th>
                  <th className="py-3 px-5">Team & Problem Statement</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-5">Team Leader</th>
                  <th className="py-3 px-5">Branch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white text-xs sm:text-sm">
                {displayedTeams.length > 0 ? (
                  displayedTeams.map((team) => {
                    const isWaiting = team.status === "Waiting List";

                    return (
                      <tr
                        key={`${team.status}-${team.srNo}-${team.teamName}`}
                        className={`transition-colors ${
                          isWaiting
                            ? "bg-amber-50/25 hover:bg-amber-50/50"
                            : "hover:bg-blue-50/30"
                        }`}
                      >
                        {/* Index */}
                        <td className="py-3.5 px-4 text-center text-xs font-semibold text-gray-400">
                          {team.srNo}
                        </td>

                        {/* Team Name & Problem Statement Summary */}
                        <td className="py-3.5 px-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm">
                              {team.teamName}
                            </span>
                            {isWaiting && (
                              <span className="px-2 py-0.5 text-[10px] font-bold text-amber-800 bg-amber-100 rounded-md border border-amber-200">
                                Waiting List #{team.srNo}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5 flex flex-wrap items-center gap-1.5">
                            <span className="font-semibold text-[#007bff]">
                              {team.psId}
                            </span>
                            <span>•</span>
                            <span className="text-gray-600 line-clamp-1">
                              {team.hostOrg}
                            </span>
                          </div>
                          {team.mentor && (
                            <div className="text-[10px] text-gray-400 mt-0.5">
                              Mentor: {team.mentor}
                            </div>
                          )}
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap ${
                              team.category === "Hardware"
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : "bg-blue-50 text-[#007bff] border border-blue-200"
                            }`}
                          >
                            {team.category === "Hardware" ? (
                              <Cpu size={11} />
                            ) : (
                              <Code2 size={11} />
                            )}
                            {team.category}
                          </span>
                        </td>

                        {/* Leader Name */}
                        <td className="py-3.5 px-5">
                          <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                            {team.leaderName}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                            Roll No: {team.rollNo}
                          </div>
                        </td>

                        {/* Branch */}
                        <td className="py-3.5 px-5 text-xs text-gray-600 font-medium">
                          {team.branch}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-xs sm:text-sm text-gray-500"
                    >
                      No team found matching &ldquo;{searchQuery}&rdquo;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-Based List View (below md) */}
          <div className="block md:hidden divide-y divide-gray-100 bg-white">
            {displayedTeams.length > 0 ? (
              displayedTeams.map((team) => {
                const isWaiting = team.status === "Waiting List";

                return (
                  <div
                    key={`${team.status}-${team.srNo}-${team.teamName}`}
                    className={`p-4 transition-colors ${
                      isWaiting ? "bg-amber-50/20" : "hover:bg-gray-50/60"
                    }`}
                  >
                    {/* Top Row: Index + Team Name + Category Badge */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-500 bg-gray-100 rounded-md flex-shrink-0">
                          {team.srNo}
                        </span>
                        <h3 className="text-sm font-bold text-gray-900 leading-snug">
                          {team.teamName}
                        </h3>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap flex-shrink-0 ${
                          team.category === "Hardware"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-blue-50 text-[#007bff] border border-blue-200"
                        }`}
                      >
                        {team.category === "Hardware" ? (
                          <Cpu size={10} />
                        ) : (
                          <Code2 size={10} />
                        )}
                        {team.category}
                      </span>
                    </div>

                    {/* Waiting List Tag if applicable */}
                    {isWaiting && (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-amber-800 bg-amber-100 rounded border border-amber-200">
                          <Clock size={10} /> Waiting List #{team.srNo}
                        </span>
                      </div>
                    )}

                    {/* Problem Statement Info */}
                    <div className="p-2.5 bg-gray-50 rounded-xl mb-2.5 text-xs">
                      <div className="flex items-center gap-1 font-semibold text-[#007bff] mb-0.5">
                        <span>{team.psId}</span>
                        <span>•</span>
                        <span className="text-gray-700 font-medium truncate">
                          {team.hostOrg}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-2">
                        {team.problemStatement}
                      </p>
                    </div>

                    {/* Leader & Academic Info */}
                    <div className="flex flex-col gap-1 text-xs text-gray-600 pt-1 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">
                          {team.leaderName}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          Roll: {team.rollNo}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {team.branch}
                      </div>
                      {team.mentor && (
                        <div className="text-[10px] text-gray-400">
                          Mentor: {team.mentor}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-xs text-gray-500 px-4">
                No team found matching &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
