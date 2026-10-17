import React from "react";
import { Target, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const SkillGaps = ({ skillGaps = [] }) => {
  const highGaps = skillGaps.filter((g) => g.severity === "high");
  const mediumGaps = skillGaps.filter((g) => g.severity === "medium");
  const lowGaps = skillGaps.filter((g) => g.severity === "low");

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Target className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Identified Skill Gaps
            </h2>
            <p className="text-xs text-slate-400">
              Areas to reinforce before your interview
            </p>
          </div>
        </div>

        {skillGaps.length > 0 && (
          <div className="flex gap-1.5">
            {highGaps.length > 0 && (
              <span className="rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-bold text-red-700">
                {highGaps.length} High
              </span>
            )}
            {mediumGaps.length > 0 && (
              <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                {mediumGaps.length} Medium
              </span>
            )}
          </div>
        )}
      </div>

      {/* Skills list */}
      <div className="mt-6 space-y-2.5">
        {skillGaps.length > 0 ? (
          skillGaps.map((gap, index) => {
            const isHigh = gap.severity === "high";
            const isMedium = gap.severity === "medium";

            const badgeStyle = isHigh
              ? "bg-red-50 text-red-700 border-red-200"
              : isMedium
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-slate-50 text-slate-700 border-slate-200";

            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-2.5">
                  {isHigh ? (
                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                  ) : isMedium ? (
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                  <span className="text-xs font-semibold text-slate-800">
                    {gap.skill}
                  </span>
                </div>

                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyle}`}
                >
                  {gap.severity || "low"} priority
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs font-medium text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>No significant skill gaps identified. Your qualifications align well!</span>
          </div>
        )}
      </div>

      {/* Helper Context */}
      {skillGaps.length > 0 && (
        <p className="mt-5 text-[11px] leading-relaxed text-slate-400 border-t border-slate-100 pt-3">
          💡 Review the recommended interview questions and the 7-day preparation roadmap to bridge these competencies before your interview.
        </p>
      )}
    </motion.section>
  );
};

export default SkillGaps;