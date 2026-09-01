"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, Code2, Cpu, Download, FileText } from "lucide-react";
import { SIH_RESULTS_DATA } from "@/constants/sihData";

export default function SihResultsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredTeams = useMemo(() => {
    return SIH_RESULTS_DATA.filter((team) => {
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
        const matchesMentor = team.mentor.toLowerCase().includes(query);

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
  }, [categoryFilter, searchQuery]);

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-gray-50/50">
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

      <div className="container relative z-10 px-4 mx-auto max-w-5xl">
        {/* Clean Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200/80 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Registration Closed
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Internal SIH <span className="text-[#007bff]">Results</span>
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
            🎉 Congratulations to all the shortlisted teams selected from the internal round to represent <span className="font-semibold text-gray-900">MHSSCE</span> at the National Stage of Smart India Hackathon! 🚀
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
            <span>ACM Chairperson: <strong className="text-gray-700">Siddiqui Tabish Javed</strong></span>
            <span>•</span>
            <span>Faculty Convenor: <strong className="text-gray-700">Dr. Zainab Mirza</strong></span>
          </div>

          {/* Quick Action Button in Header */}
          <div className="mt-5 flex justify-center">
            <a
              href="/sih-results.pdf"
              download="Internal-Smart-India-Hackathon-Result.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#007bff] hover:bg-blue-700 rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              <Download size={15} />
              <span>Download Official Result PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Results Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden"
        >
          {/* Controls Bar */}
          <div className="p-4 sm:p-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto bg-gray-100/80 p-1 rounded-xl">
              <button
                onClick={() => setCategoryFilter("All")}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === "All"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Teams
              </button>
              <button
                onClick={() => setCategoryFilter("Software")}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === "Software"
                    ? "bg-white text-[#007bff] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Code2 size={13} />
                Software
              </button>
              <button
                onClick={() => setCategoryFilter("Hardware")}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === "Hardware"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Cpu size={13} />
                Hardware
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search team, leader, branch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs sm:text-sm bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/60 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-14 text-center">Sr. No.</th>
                  <th className="py-3 px-5">Team Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-5">Team Leader</th>
                  <th className="py-3 px-5">Branch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white text-xs sm:text-sm">
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <tr
                      key={team.srNo}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      {/* Sr. No. */}
                      <td className="py-3 px-4 text-center text-xs font-semibold text-gray-400">
                        {team.srNo}
                      </td>

                      {/* Team Name */}
                      <td className="py-3 px-5">
                        <div className="font-bold text-gray-900">
                          {team.teamName}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                          <span className="font-medium text-[#007bff]">{team.psId}</span> • {team.hostOrg}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                            team.category === "Hardware"
                              ? "bg-purple-50 text-purple-700 border border-purple-200/80"
                              : "bg-blue-50 text-[#007bff] border border-blue-200/80"
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
                      <td className="py-3 px-5">
                        <div className="font-semibold text-gray-900">
                          {team.leaderName}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          {team.rollNo}
                        </div>
                      </td>

                      {/* Branch */}
                      <td className="py-3 px-5 text-xs text-gray-600 font-medium">
                        {team.branch}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs sm:text-sm text-gray-500">
                      No team found matching &ldquo;{searchQuery}&rdquo;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
