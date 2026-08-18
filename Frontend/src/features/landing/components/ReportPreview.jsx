import React from "react";

const ReportPreview = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            <span>✦</span>
            YOUR REPORT
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            See What{" "}
            <span className="text-indigo-600">InterviewAI</span>{" "}
            Generates
          </h2>
        </div>

        {/* Report Preview */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <img
            src="/report_Preview.png"
            alt="InterviewAI generated report preview"
            className="h-auto w-full"
          />
        </div>

      </div>
    </section>
  );
};

export default ReportPreview;