import React from "react";
import { FileText, Upload, User, Sparkles } from "lucide-react";

const InterviewWorkspace = ({
  jobDescription,
  setJobDescription,
  selfDescription,
  setSelfDescription,
  fileName,
  handleFileChange,
  resumeInputRef,
  onGenerate,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Main Inputs */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Job Description */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                1. Job Description <span className="text-red-500">*</span>
              </h2>
              <p className="text-xs text-slate-500">
                Paste the requirements and role responsibilities
              </p>
            </div>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={5000}
            placeholder="Paste complete job description here..."
            className="h-64 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
            <span>Minimum 20 characters</span>
            <span>{jobDescription.length} / 5000</span>
          </div>
        </div>

        {/* Profile & Resume */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                2. Your Profile & Resume
              </h2>
              <p className="text-xs text-slate-500">
                Upload your resume (PDF only) and highlight key skills
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Resume Upload */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Upload Resume
              </label>

              <label
                htmlFor="resume"
                className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-3 text-center transition-all ${
                  fileName
                    ? "border-indigo-400 bg-indigo-50/50"
                    : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/20"
                }`}
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Upload className="h-4 w-4" />
                </div>

                <p className="text-xs font-semibold text-slate-800 truncate max-w-[140px]">
                  {fileName || "Choose file"}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  PDF only (Max 3MB)
                </p>

                <input
                  ref={resumeInputRef}
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Self Description */}
            <div>
              <label
                htmlFor="selfDescription"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Self Summary (Optional)
              </label>

              <textarea
                id="selfDescription"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                maxLength={1000}
                placeholder="Briefly highlight relevant experience, strengths, or technologies..."
                className="h-48 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

              <div className="mt-1 text-right text-[11px] text-slate-400">
                {selfDescription.length} / 1000
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-5 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-xs">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              AI-Powered Preparation Engine
            </h3>
            <p className="text-xs text-slate-500">
              Analyzes job expectations against your background to generate customized prep resources.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-1.5 md:w-auto">
          <button
            onClick={onGenerate}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-indigo-700 md:w-auto"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Generate Strategy
          </button>
          <span className="text-[10px] text-slate-400">
            Powered by Gemini AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default InterviewWorkspace;