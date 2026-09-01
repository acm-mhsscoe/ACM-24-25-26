"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  Code2,
  Cpu,
  Trophy,
  CheckCircle,
  Clock,
  ChevronRight,
  Eye,
  Download,
  Building2,
  Tag,
  ArrowUpDown,
  FileSpreadsheet,
} from "lucide-react";
import {
  MOCK_SIH_TEAMS,
  SIH_DOMAINS,
  SIH_DEPARTMENTS,
} from "@/constants/sihData";
import SihTeamModal from "./SihTeamModal";

export default function SihResultsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // All | Software | Hardware
  const [selectedStatus, setSelectedStatus] = useState("All"); // All | Nominated | Waitlisted
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [sortBy, setSortBy] = useState("rank"); // rank | score | teamName
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Filtered & Sorted Teams
  const filteredTeams = useMemo(() => {
    return MOCK_SIH_TEAMS.filter((team) => {
      // Category filter
      if (selectedCategory !== "All" && team.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== "All" && team.status !== selectedStatus) {
        return false;
      }
      // Department filter
      if (
        selectedDepartment !== "All Departments" &&
        team.department !== selectedDepartment
      ) {
        return false;
      }
      // Domain filter
      if (selectedDomain !== "All Domains" && team.domain !== selectedDomain) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = team.teamName.toLowerCase().includes(query);
        const matchesLeader = team.leaderName.toLowerCase().includes(query);
        const matchesPsCode = team.psCode.toLowerCase().includes(query);
        const matchesPsTitle = team.psTitle.toLowerCase().includes(query);
        const matchesDept = team.department.toLowerCase().includes(query);
        const matchesDomain = team.domain.toLowerCase().includes(query);
        const matchesMinistry = team.ministry.toLowerCase().includes(query);
        const matchesMembers = team.members?.some((m) =>
          m.name.toLowerCase().includes(query)
        );

        if (
          !matchesName &&
          !matchesLeader &&
          !matchesPsCode &&
          !matchesPsTitle &&
          !matchesDept &&
          !matchesDomain &&
          !matchesMinistry &&
          !matchesMembers
        ) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === "rank") {
        comparison = a.rank - b.rank;
      } else if (sortBy === "score") {
        comparison = b.score - a.score;
      } else if (sortBy === "teamName") {
        comparison = a.teamName.localeCompare(b.teamName);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedStatus,
    selectedDepartment,
    selectedDomain,
    sortBy,
    sortOrder,
  ]);

  const handleExportResults = () => {
    triggerToast("Generating SIH 2024 MHSSCE Internal Results PDF...");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedStatus !== "All" ||
    selectedDepartment !== "All Departments" ||
    selectedDomain !== "All Domains";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedDepartment("All Departments");
    setSelectedDomain("All Domains");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xl shadow-gray-200/50 overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp">
          <CheckCircle size={18} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Search Bar Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50/90 to-white border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2.5">
              <Trophy size={24} className="text-amber-500" />
              <span>Internal SIH Evaluation Results</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {filteredTeams.length}
              </span>{" "}
              of {MOCK_SIH_TEAMS.length} evaluated teams
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportResults}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              title="Download results list"
            >
              <Download size={16} className="text-blue-600" />
              <span>Export Results</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by team name, leader, problem statement ID (e.g. SIH1542), keyword, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white text-gray-900 placeholder-gray-400 text-sm rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills and Dropdowns */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Category / Track Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === "All"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"
                }`}
              >
                All Editions
              </button>
              <button
                onClick={() => setSelectedCategory("Software")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === "Software"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100/80 border border-blue-200/60"
                }`}
              >
                <Code2 size={13} />
                Software Edition
              </button>
              <button
                onClick={() => setSelectedCategory("Hardware")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === "Hardware"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100/80 border border-purple-200/60"
                }`}
              >
                <Cpu size={13} />
                Hardware Edition
              </button>
              <button
                onClick={() =>
                  setSelectedStatus(
                    selectedStatus === "Nominated" ? "All" : "Nominated"
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedStatus === "Nominated"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60"
                }`}
              >
                <CheckCircle size={13} />
                Nominated Only
              </button>
              <button
                onClick={() =>
                  setSelectedStatus(
                    selectedStatus === "Waitlisted" ? "All" : "Waitlisted"
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedStatus === "Waitlisted"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-500/20"
                    : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60"
                }`}
              >
                <Clock size={13} />
                Waitlisted
              </button>
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {SIH_DEPARTMENTS.map((dept, i) => (
                  <option key={i} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {SIH_DOMAINS.map((domain, i) => (
                  <option key={i} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200 flex items-center gap-1"
                >
                  <X size={13} />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View (Hidden on Mobile) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200/80 text-xs font-bold text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 w-16 text-center">Rank</th>
              <th className="py-3.5 px-4">Team & Department</th>
              <th className="py-3.5 px-4">Team Leader</th>
              <th className="py-3.5 px-4">Problem Statement</th>
              <th className="py-3.5 px-4">Edition</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => {
                const isHardware = team.category === "Hardware";
                const isNominated = team.status === "Nominated";

                return (
                  <tr
                    key={team.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => setSelectedTeam(team)}
                  >
                    {/* Rank */}
                    <td className="py-4 px-4 text-center">
                      <div
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-extrabold text-xs shadow-sm ${
                          team.rank === 1
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : team.rank === 2
                            ? "bg-slate-200 text-slate-800 border border-slate-300"
                            : team.rank === 3
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-gray-50 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {team.rank === 1
                          ? "🥇"
                          : team.rank === 2
                          ? "🥈"
                          : team.rank === 3
                          ? "🥉"
                          : `#${team.rank}`}
                      </div>
                    </td>

                    {/* Team Name & Department */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {team.teamName}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <span>{team.department}</span>
                        <span>•</span>
                        <span>{team.year}</span>
                      </div>
                    </td>

                    {/* Team Leader */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">
                        {team.leaderName}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        {team.leaderEmail}
                      </div>
                    </td>

                    {/* Problem Statement */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-bold">
                          {team.psCode}
                        </span>
                        <span className="text-[11px] font-medium text-gray-500 truncate">
                          {team.ministry}
                        </span>
                      </div>
                      <div
                        className="text-xs text-gray-700 font-medium line-clamp-2"
                        title={team.psTitle}
                      >
                        {team.psTitle}
                      </div>
                    </td>

                    {/* Category / Edition */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          isHardware
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {isHardware ? <Cpu size={13} /> : <Code2 size={13} />}
                        {team.category}
                      </span>
                      <div className="text-[11px] text-gray-500 mt-1">
                        {team.domain}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isNominated
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {isNominated ? (
                          <CheckCircle size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {isNominated ? "Nominated" : "Waitlist"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTeam(team);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Eye size={13} />
                        <span>Roster</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <div className="max-w-md mx-auto">
                    <Filter size={36} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-base font-bold text-gray-800">
                      No matching teams found
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 mb-4">
                      Try adjusting your search criteria or resetting filters.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card View (Visible on Small Screens) */}
      <div className="lg:hidden divide-y divide-gray-100">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => {
            const isHardware = team.category === "Hardware";
            const isNominated = team.status === "Nominated";

            return (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="p-5 hover:bg-blue-50/40 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-extrabold text-xs shadow-sm ${
                        team.rank === 1
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : team.rank === 2
                          ? "bg-slate-200 text-slate-800 border border-slate-300"
                          : team.rank === 3
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      #{team.rank}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">
                        {team.teamName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {team.department}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isNominated
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {isNominated ? "Nominated" : "Waitlist"}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl mb-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-blue-700 mb-1">
                    <Tag size={12} /> {team.psCode} •{" "}
                    <span className="font-medium text-gray-600 truncate">
                      {team.ministry}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium line-clamp-2">
                    {team.psTitle}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold ${
                        isHardware
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {isHardware ? <Cpu size={12} /> : <Code2 size={12} />}
                      {team.category}
                    </span>
                    <span>Lead: {team.leaderName}</span>
                  </div>

                  <span className="font-semibold text-blue-600 flex items-center gap-0.5">
                    View Roster <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center">
            <Filter size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-bold text-gray-800">
              No matching teams found
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Selected Team Details Modal */}
      {selectedTeam && (
        <SihTeamModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
}
