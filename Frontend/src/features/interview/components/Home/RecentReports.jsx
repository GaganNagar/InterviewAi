import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Calendar, Target, Search } from "lucide-react";
import { motion } from "framer-motion";

const RecentReports = ({ reports = [] }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const filteredReports = reports.filter((r) =>
    (r.title || "Untitled Role").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {/* Search / Filter if more than 3 reports */}
      {reports.length > 3 && (
        <div className="mb-6 flex justify-end">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter previous roles..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      )}

      {/* Grid of Report Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report, index) => {
          const score = report.matchScore || 0;
          const scoreColor =
            score >= 80
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : score >= 60
              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
              : "bg-amber-50 text-amber-700 border-amber-200";

          return (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => navigate(`/report/${report._id}`)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header row: Match score */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${scoreColor}`}
                  >
                    <Target className="h-3 w-3" />
                    {score}% Match
                  </span>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {report.title || "Interview Preparation Strategy"}
                </h3>

                <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  Tailored questions, 7-day preparation roadmap, and ATS resume export.
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">
                  Open Strategy
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentReports;