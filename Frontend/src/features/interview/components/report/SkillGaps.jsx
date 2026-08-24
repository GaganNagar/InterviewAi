import React from "react";
import { Target, AlertCircle } from "lucide-react";

const SkillGaps = ({ skillGaps = [] }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Target className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Identified Skill Gaps
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Skills to focus on before your interview
          </p>
        </div>

      </div>


      {/* Skills */}
      <div className="mt-6 space-y-3">

        {skillGaps.length > 0 ? (
          skillGaps.map((gap, index) => {

            const severity =
              gap.severity === "high"
                ? "bg-red-50 text-red-600 border-red-100"
                : gap.severity === "mid"
                ? "bg-amber-50 text-amber-600 border-amber-100"
                : "bg-slate-50 text-slate-600 border-slate-200";

            return (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${severity}`}
              >
                <span className="text-xs font-semibold">
                  {gap.skill}
                </span>

                <span className="text-[10px] font-bold uppercase tracking-wide">
                  {gap.severity || "low"}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            <AlertCircle className="h-4 w-4" />
            No major skill gaps identified.
          </div>
        )}

      </div>


      {/* Helper */}
      {skillGaps.length > 0 && (
        <p className="mt-5 text-[11px] leading-5 text-slate-400">
          Focus on these skills during your preparation to improve your
          interview readiness.
        </p>
      )}

    </section>
  );
};

export default SkillGaps;