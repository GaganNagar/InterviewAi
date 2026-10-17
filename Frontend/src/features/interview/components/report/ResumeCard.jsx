import React from "react";
import { FileText, Download, CheckCircle2, Sparkles, Loader2 } from "lucide-react";

const ResumeCard = ({
  onDownload,
  resumeName = "Your Resume",
  resumeLoading = false,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <FileText className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Resume Optimization
          </p>
          <h2 className="mt-0.5 text-lg font-bold text-slate-900">
            ATS-Tailored Resume
          </h2>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-xs border border-slate-100">
            <FileText className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-slate-800">
              {resumeName}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Tailored and formatted for ATS scanners & hiring managers
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
            Optimization Breakdown
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-400">ATS Parsing</p>
            <p className="mt-1 text-base font-bold text-emerald-600">Optimal</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-400">Keyword Alignment</p>
            <p className="mt-1 text-base font-bold text-indigo-600">High Impact</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-400">Role Structure</p>
            <p className="mt-1 text-base font-bold text-slate-900">Customized</p>
          </div>
        </div>
      </div>

      {/* Download action card */}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Ready to apply with this resume?
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Download the rendered PDF document directly to your device.
          </p>
        </div>

        <button
          onClick={onDownload}
          disabled={resumeLoading}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-indigo-700 disabled:opacity-60"
        >
          {resumeLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default ResumeCard;