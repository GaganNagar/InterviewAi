import React from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const ResumeCard = ({
  onDownload,
  resumeName = "Your Resume",
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <FileText className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Resume Review
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            ATS-Friendly Resume
          </h2>
        </div>

      </div>


      {/* Resume Preview */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
            <FileText className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-slate-800">
              {resumeName}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Optimized for your target role
            </p>
          </div>

          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

        </div>

      </div>


      {/* Optimization Summary */}
      <div className="mt-6">

        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />

          <h3 className="text-sm font-semibold text-slate-900">
            Resume Optimization
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-400">
              ATS Compatibility
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              High
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-400">
              Keywords Matched
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              Strong
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-400">
              Role Alignment
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              Good
            </p>
          </div>

        </div>

      </div>


      {/* Download */}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Ready to use your optimized resume?
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Download the ATS-friendly version tailored to this role.
          </p>
        </div>

        <button
          onClick={onDownload}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </button>

      </div>

    </section>
  );
};

export default ResumeCard;