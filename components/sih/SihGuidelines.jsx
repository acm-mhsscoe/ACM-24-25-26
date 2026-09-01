"use client";

import React, { useState } from "react";
import {
  FileText,
  Globe,
  ShieldCheck,
  Users,
  ChevronDown,
  ChevronUp,
  Download,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { SIH_GUIDELINES } from "@/constants/sihData";

export default function SihGuidelines() {
  const [openFaq, setOpenFaq] = useState(null);

  const iconMap = {
    Globe: <Globe className="text-blue-600" size={22} />,
    ShieldCheck: <ShieldCheck className="text-emerald-600" size={22} />,
    FileText: <FileText className="text-purple-600" size={22} />,
    Users: <Users className="text-amber-600" size={22} />,
  };

  const faqs = [
    {
      q: "What are the next steps after internal hackathon nomination?",
      a: "Team leaders of the 30 nominated teams must ensure all 6 members are registered on the central Smart India Hackathon portal (sih.gov.in) with the exact problem statement ID selected during internal evaluation. The MHSSCE SPOC will subsequently verify and forward the team nominations to the central AICTE/SIH committee.",
    },
    {
      q: "Can we change our team members or problem statement at this stage?",
      a: "Minor changes to team composition may only be considered under exceptional circumstances with prior approval from the college SPOC before the central portal submission deadline. The mandatory rule of having 6 members with at least one female participant remains strictly enforced.",
    },
    {
      q: "When will the national round results / grand finale finalists be announced?",
      a: "After the central SIH evaluation committee reviews the submitted idea presentation PPTs across India, the shortlisted grand finale teams will be notified directly on the SIH portal and through college email announcements.",
    },
    {
      q: "Who is the contact point for queries and SPOC verification?",
      a: "You can reach out to the MHSSCE ACM faculty coordinators or the official SIH SPOC via the college Computer Engineering & IT department offices.",
    },
  ];

  return (
    <div className="mt-12 space-y-8">
      {/* Guidelines Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl shadow-gray-200/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              <ShieldCheck size={14} /> Official Instructions
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900">
              Next Steps for Nominated Teams
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Key instructions and mandatory requirements for the 30 nominated MHSSCE teams.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.sih.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
            >
              <ExternalLink size={16} />
              <span>Official SIH Portal</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {SIH_GUIDELINES.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/70 hover:bg-gray-50 transition-colors flex gap-4 items-start"
            >
              <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                {iconMap[item.icon] || <FileText size={22} className="text-blue-600" />}
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl shadow-gray-200/40">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle size={22} className="text-blue-600" />
          <h3 className="text-xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-gray-50/60 hover:bg-gray-50 transition-colors text-sm font-bold text-gray-800"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp size={18} className="text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 py-4 bg-white text-xs sm:text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
