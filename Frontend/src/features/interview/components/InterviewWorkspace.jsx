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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Main Inputs */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* Job Description */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                1. Job Description
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Paste the full job description here
              </p>
            </div>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={5000}
            placeholder="Paste job description..."
            className="h-60 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          <div className="mt-2 text-right text-xs text-slate-400">
            {jobDescription.length} / 5000
          </div>
        </div>


        {/* Profile */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                2. Your Profile
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Upload your resume and add a short self description
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Resume */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Upload Resume
              </label>

              <label
                htmlFor="resume"
                className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed text-center transition-all ${
                  fileName
                    ? "border-indigo-300 bg-indigo-50"
                    : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
                }`}
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Upload className="h-5 w-5" />
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  {fileName || "Click to upload"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PDF, DOCX (Max. 5MB)
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
            </div>


            {/* Self Description */}
            <div>
              <label
                htmlFor="selfDescription"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Self Description
              </label>

              <textarea
                id="selfDescription"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                maxLength={1000}
                placeholder="Tell us about your experience, skills, projects..."
                className="h-48 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

              <div className="mt-2 text-right text-xs text-slate-400">
                {selfDescription.length} / 1000
              </div>
            </div>

          </div>
        </div>

      </div>


      {/* Generate Report */}
      <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-xl border border-indigo-100 bg-indigo-50/50 p-5 md:flex-row">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              AI-Powered Strategy Generation
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Our AI will analyze your inputs and generate a personalized interview plan.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-2 md:w-auto">
          <button
            onClick={onGenerate}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md md:w-auto"
          >
            <Sparkles className="h-4 w-4" />
            Generate Interview Plan
          </button>

          <span className="text-[11px] text-slate-400">
            Takes about 30–40 seconds
          </span>
        </div>

      </div>

    </div>
  );
};

export default InterviewWorkspace;