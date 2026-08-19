import React from "react";
import { FileText, Upload } from "lucide-react";

const InterviewWorkspace = ({
  jobDescription,
  setJobDescription,
  selfDescription,
  setSelfDescription,
  fileName,
  handleFileChange,
  resumeInputRef,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

      {/* Job Description */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Job Description
            </h2>
            <p className="text-xs text-slate-500">
              Paste the role you're applying for
            </p>
          </div>

          <span className="ml-auto rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-600">
            Required
          </span>
        </div>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          maxLength={5000}
          placeholder="Paste the full job description here..."
          className="h-80 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />

        <div className="mt-2 text-right text-xs text-slate-400">
          {jobDescription.length} / 5000
        </div>
      </div>

      {/* Profile */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Your Profile
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Upload your resume or describe your experience
          </p>
        </div>

        {/* Resume */}
        <label className="mb-4 block text-sm font-semibold text-slate-700">
          Resume
        </label>

        <label
          htmlFor="resume"
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-7 text-center transition-all ${
            fileName
              ? "border-indigo-300 bg-indigo-50"
              : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
          }`}
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
            <Upload className="h-5 w-5" />
          </div>

          <p className="text-sm font-semibold text-slate-700">
            {fileName || "Upload your resume"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            PDF or DOCX • Max 5MB
          </p>

          <input
            ref={resumeInputRef}
            id="resume"
            type="file"
            accept=".pdf,.docx"
            hidden
            onChange={handleFileChange}
          />
        </label>

        {/* OR */}
        <div className="relative my-7">
          <div className="border-t border-slate-200" />

          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-medium text-slate-400">
            OR
          </span>
        </div>

        {/* Self Description */}
        <label
          htmlFor="selfDescription"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Self Description
        </label>

        <textarea
          id="selfDescription"
          value={selfDescription}
          onChange={(e) => setSelfDescription(e.target.value)}
          placeholder="Briefly describe your experience, skills, and background..."
          className="h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />

        <p className="mt-2 text-xs text-slate-400">
          Either a resume or self description is required.
        </p>

      </div>
    </div>
  );
};

export default InterviewWorkspace;