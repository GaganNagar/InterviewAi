import React from "react";
import { useNavigate } from "react-router";

const RecentReports = ({ reports }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <div
          key={report._id}
          onClick={() => navigate(`/report/${report._id}`)}
          className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
        >
          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
            {report.title || "Untitled Position"}
          </h3>

          {/* Date */}
          <p className="mt-2 text-xs text-slate-400">
            Generated on{" "}
            {new Date(report.createdAt).toLocaleDateString()}
          </p>

          {/* Bottom */}
          <div className="mt-6 flex items-center justify-between">
            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                report.matchScore >= 80
                  ? "bg-emerald-50 text-emerald-600"
                  : report.matchScore >= 60
                  ? "bg-amber-50 text-amber-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              Match: {report.matchScore}%
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all group-hover:bg-indigo-50 group-hover:text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentReports;