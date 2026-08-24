import React from "react";
import { ArrowLeft, Download, CalendarDays } from "lucide-react";

const ReportHeader = ({
  title,
  createdAt,
  onBack,
  onDownload,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white px-8 py-6 lg:px-10">

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

        {/* Left Content */}
        <div>

          {/* Back */}
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>

          {/* Report Info */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Interview Report
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title || "Interview Report"}
            </h1>

            {createdAt && (
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays className="h-4 w-4" />

                <span>
                  Created on{" "}
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Download Report */}
        <button
          onClick={onDownload}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Download className="h-4 w-4" />
          Download Report
        </button>

      </div>

    </header>
  );
};

export default ReportHeader;