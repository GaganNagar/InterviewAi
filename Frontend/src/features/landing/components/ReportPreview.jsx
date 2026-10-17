import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const ReportPreview = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>REPORT ARTIFACT</span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            See What <span className="text-indigo-600">InterviewAI</span> Delivers
          </h2>
          <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
            A comprehensive, interactive report detailing role alignment, custom questions, actionable skill gaps, and a full preparation schedule.
          </p>
        </div>

        {/* Report Preview Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50"
        >
          <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 text-[11px] font-medium text-slate-400">
              InterviewAI Interactive Candidate Dashboard
            </span>
          </div>

          <img
            src="/report_Preview.png"
            alt="InterviewAI generated report preview"
            className="h-auto w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ReportPreview;