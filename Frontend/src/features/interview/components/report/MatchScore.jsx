import React from "react";
import { Target, CheckCircle, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const MatchScore = ({ score = 0 }) => {
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));

  // SVG circular progress calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getScoreInfo = () => {
    if (normalizedScore >= 80) {
      return {
        label: "Exceptional Match",
        color: "text-emerald-600",
        stroke: "#10B981",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "Strong Candidate",
        description: "Your background closely reflects the core qualifications and technical competencies required for this role.",
      };
    }
    if (normalizedScore >= 60) {
      return {
        label: "Competitive Match",
        color: "text-indigo-600",
        stroke: "#6366F1",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        badge: "Well Positioned",
        description: "Your experience meets key requirements with a few specific skills to address before the interview.",
      };
    }
    return {
      label: "Growth Opportunity",
      color: "text-amber-600",
      stroke: "#F59E0B",
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "Targeted Prep Needed",
      description: "Focus on closing the identified skill gaps using the 7-day preparation roadmap to boost your confidence.",
    };
  };

  const info = getScoreInfo();

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
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
              Role Match Analysis
            </h2>
            <p className="text-xs text-slate-400">
              Algorithmic resume vs. job requirements fit
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold border ${info.bg} ${info.color} ${info.border}`}
        >
          {info.badge}
        </span>
      </div>

      {/* Circular Gauge */}
      <div className="my-6 flex flex-col items-center justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 128 128">
            {/* Background Track */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="9"
              fill="transparent"
              className="text-slate-100"
            />
            {/* Animated Progress Circle */}
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              stroke={info.stroke}
              strokeWidth="9"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-3xl font-extrabold tracking-tight text-slate-900"
            >
              {normalizedScore}
              <span className="text-base font-semibold text-slate-400">%</span>
            </motion.span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Match
            </span>
          </div>
        </div>

        <div className="mt-3 text-center">
          <h3 className={`text-sm font-bold ${info.color}`}>
            {info.label}
          </h3>
          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
            {info.description}
          </p>
        </div>
      </div>

      {/* Mini breakdown metrics */}
      <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Relevance Fit
          </p>
          <p className="mt-0.5 text-xs font-bold text-slate-700">
            {normalizedScore >= 70 ? "High Alignment" : "Partial Alignment"}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Readiness
          </p>
          <p className="mt-0.5 text-xs font-bold text-slate-700">
            {normalizedScore >= 75 ? "Interview Ready" : "7-Day Prep Suggested"}
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default MatchScore;