import React from "react";
import { Target } from "lucide-react";

const MatchScore = ({ score }) => {
  const getScoreMessage = () => {
    if (score >= 80) return "Strong Match";
    if (score >= 60) return "Good Match";
    return "Needs Improvement";
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Target className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Overall Match Score
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Resume vs. job requirements
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="my-7 flex justify-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-indigo-50">

          <div className="absolute inset-0 rounded-full border-[10px] border-indigo-600 border-l-transparent border-b-transparent -rotate-45" />

          <div className="text-center">
            <span className="text-3xl font-bold text-slate-900">
              {score}
            </span>

            <span className="text-sm font-semibold text-slate-400">
              %
            </span>
          </div>

        </div>
      </div>

      {/* Result */}
      <div className="text-center">
        <h3 className="text-sm font-semibold text-slate-900">
          {getScoreMessage()}
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Your profile has a good alignment with the requirements
          of this role.
        </p>
      </div>

    </section>
  );
};

export default MatchScore;