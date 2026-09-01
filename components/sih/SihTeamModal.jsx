"use client";

import React, { useEffect } from "react";
import {
  X,
  Trophy,
  Users,
  Building2,
  Tag,
  Mail,
  GraduationCap,
  Sparkles,
  Code2,
  Cpu,
  CheckCircle,
  FileText,
  UserCheck,
} from "lucide-react";

export default function SihTeamModal({ team, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!team) return null;

  const isHardware = team.category === "Hardware";
  const isNominated = team.status === "Nominated";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click listener */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-100 z-10 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-base shadow-sm ${
                team.rank === 1
                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                  : team.rank === 2
                  ? "bg-slate-100 text-slate-700 border border-slate-300"
                  : team.rank === 3
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              #{team.rank}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                {team.teamName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    isHardware
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {isHardware ? <Cpu size={12} /> : <Code2 size={12} />}
                  {team.category} Edition
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    isNominated
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  <CheckCircle size={12} />
                  {isNominated ? "Nominated (National Stage)" : "Waitlisted"}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  Score: {team.score}/100
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Problem Statement Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 via-slate-50 to-indigo-50/40 border border-blue-100/80">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold tracking-wide">
                <Tag size={12} /> {team.psCode}
              </span>
              <span className="text-xs font-medium text-gray-600 bg-white/80 px-2.5 py-1 rounded-lg border border-gray-200">
                {team.ministry}
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mt-2">
              {team.psTitle}
            </h3>
            {team.abstract && (
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                {team.abstract}
              </p>
            )}
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                <Building2 size={15} className="text-blue-600" />
                <span>Department & Year</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {team.department}
              </p>
              <p className="text-xs text-gray-500">{team.year}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                <GraduationCap size={15} className="text-indigo-600" />
                <span>Faculty Mentor</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {team.mentor || "MHSSCE Faculty Panel"}
              </p>
              <p className="text-xs text-gray-500">Internal Hackathon Mentor</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                <Sparkles size={15} className="text-amber-500" />
                <span>Domain Focus</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {team.domain}
              </p>
              <p className="text-xs text-gray-500">SIH Category Track</p>
            </div>
          </div>

          {/* Team Members Roster */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                <span>Team Roster ({team.members?.length || 6} Members)</span>
              </h4>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                <UserCheck size={13} /> SIH Compliant (Includes Female Representation)
              </span>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-2xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 sm:px-4">#</th>
                    <th className="py-2.5 px-3 sm:px-4">Member Name</th>
                    <th className="py-2.5 px-3 sm:px-4">Project Role</th>
                    <th className="py-2.5 px-3 sm:px-4">Dept / Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {team.members?.map((member, idx) => (
                    <tr
                      key={idx}
                      className={
                        idx === 0
                          ? "bg-blue-50/40 font-medium"
                          : "hover:bg-gray-50/60 transition-colors"
                      }
                    >
                      <td className="py-2.5 px-3 sm:px-4 text-gray-500">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-gray-900">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{member.name}</span>
                          {idx === 0 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded">
                              Leader
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-gray-600">
                        {member.role}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-gray-500">
                        {member.dept} • {member.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact / Notice */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <span>
                Team Leader Email:{" "}
                <span className="font-semibold text-gray-800">
                  {team.leaderEmail}
                </span>
              </span>
            </div>
            <span className="text-[11px] text-gray-500 italic">
              Verified by MHSSCE SIH SPOC
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
