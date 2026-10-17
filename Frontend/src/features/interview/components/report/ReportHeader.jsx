import React from "react";
import { ArrowLeft, Download, CalendarDays, Loader2, Menu } from "lucide-react";

const ReportHeader = ({
  title,
  createdAt,
  onBack,
  onDownload,
  resumeLoading = false,
  onToggleMobileNav,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-8 sm:py-5 lg:px-10 sticky top-0 z-30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Content */}
        <div className="flex items-center gap-3">
          {onToggleMobileNav && (
            <button
              onClick={onToggleMobileNav}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <div>
            <button
              onClick={onBack}
              className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Workspace
            </button>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-2xl line-clamp-1">
                {title || "Interview Strategy Report"}
              </h1>

              {createdAt && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CalendarDays className="h-3 w-3" />
                  <span>
                    Generated on {new Date(createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Download Action */}
        <button
          onClick={onDownload}
          disabled={resumeLoading}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-60"
        >
          {resumeLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-600" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF Resume</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default ReportHeader;