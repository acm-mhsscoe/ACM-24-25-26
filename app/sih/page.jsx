"use client";

import React, { useState } from "react";
import { ExternalLink, Rocket, AlertCircle, RefreshCw, AlertTriangle, ShieldAlert } from "lucide-react";

export default function SihRegistrationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const rawFormUrl =
    process.env.NEXT_PUBLIC_SIH_GOOGLE_FORM_URL ||
    "https://docs.google.com/forms/d/e/1FAIpQLSevhpN4P6tX95mqtwhtnp3gVam1MORXdZ2z2ua03oP8oa7gVg/viewform?usp=header";

  // Ensure iframe URL has embedded=true if it's a google form link
  const embedFormUrl = rawFormUrl.includes("viewform")
    ? rawFormUrl.replace(/viewform(\?.*)?$/, "viewform?embedded=true")
    : rawFormUrl;

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-50 via-blue-50/30 to-white">
      <div className="container px-4 mx-auto max-w-5xl">
        {/* Header Banner */}
        <div className="p-8 mb-6 text-center bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-500/5 backdrop-blur-xl">
          <h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-5xl">
            Internal SIH <span className="text-blue-600">Registration</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
            Internal Smart India Hackathon registration for MHSSCE students.
            Fill out the form below with your team details to participate.
          </p>

          {/* Quick Action Button */}
          <div className="flex flex-wrap gap-4 justify-center items-center mt-6">
            <a
              href={rawFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2 items-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ExternalLink size={16} />
              <span>Open Form in New Tab</span>
            </a>
          </div>
        </div>

        {/* College Domain Email Requirement Warning Box */}
        <div className="p-5 mb-8 bg-amber-50/90 rounded-2xl border border-amber-200/80 shadow-sm flex items-start gap-4">
          <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700 flex-shrink-0 mt-0.5">
            <AlertTriangle size={22} />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-base font-bold text-amber-900 flex items-center gap-2">
              <span>MHSSCE Email Login Required</span>
            </h3>
            <p className="mt-1 text-sm text-amber-800 leading-relaxed">
              Please make sure you are signed into Google with your official college domain email address (<span className="font-semibold underline decoration-amber-400">@mhssce.ac.in</span>) in your browser. Otherwise, the form below will display a <span className="font-semibold">&quot;You need permission&quot;</span> message.
            </p>
          </div>
        </div>

        {/* Embedded Form Container */}
        <div className="relative overflow-hidden bg-white rounded-3xl border border-gray-200/80 shadow-2xl shadow-gray-200/50">
          {/* Top Bar inside iframe box */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50/80 border-b border-gray-100 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Rocket size={18} className="text-blue-600" />
              <span>Official SIH Registration Form</span>
            </div>
            <button
              onClick={() => {
                setIsLoading(true);
                setIframeError(false);
              }}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors"
              title="Reload Form"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col justify-center items-center py-24 min-h-[600px] bg-white">
              <div className="mb-4 w-12 h-12 rounded-full border-4 border-blue-200 animate-spin border-t-blue-600" />
              <p className="text-sm font-medium text-gray-600">
                Loading SIH Registration Form...
              </p>
            </div>
          )}

          {/* Error / Fallback State */}
          {iframeError && (
            <div className="flex flex-col justify-center items-center p-8 text-center min-h-[400px]">
              <AlertCircle size={48} className="mb-4 text-amber-500" />
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Form display issue?
              </h3>
              <p className="mb-6 max-w-md text-sm text-gray-600">
                If the Google Form does not load directly inside this frame,
                you can open it in a new window to submit your responses smoothly.
              </p>
              <a
                href={rawFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gap-2 items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all"
              >
                <ExternalLink size={16} />
                <span>Open Google Form</span>
              </a>
            </div>
          )}

          {/* Embedded Google Form Iframe */}
          <iframe
            src={embedFormUrl}
            className={`w-full min-h-[850px] border-none transition-opacity duration-300 ${
              isLoading ? "opacity-0 absolute" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setIframeError(true);
            }}
            title="Smart India Hackathon Registration Form"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </main>
  );
}
