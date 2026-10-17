import React, { useState, useRef, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { AlertCircle } from "lucide-react";

import Navbar from "../components/Home/Navbar.jsx";
import Header from "../components/Home/Header.jsx";
import InterviewWorkspace from "../components/Home/InterviewWorkspace.jsx";
import RecentReports from "../components/Home/RecentReports.jsx";
import Footer from "../components/Home/Footer.jsx";

const steps = [
  "Reading & Parsing Resume",
  "Analyzing Job Description",
  "Identifying Skill Gaps",
  "Generating Interview Strategy",
];

const Home = () => {
  const {
    loading: generatingReport,
    reportsLoading,
    generateReport,
    reports,
    getReports,
  } = useInterview();

  const { user, handleLogout } = useAuth();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [formError, setFormError] = useState("");

  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  // Load user's recent reports on mount
  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    let interval;
    if (generatingReport) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 4000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [generatingReport]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormError("");

    if (file) {
      if (file.type !== "application/pdf") {
        setFormError("Only PDF resumes are supported. Please upload a .pdf file.");
        e.target.value = "";
        setFileName("");
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        setFormError("File size exceeds 3MB limit. Please upload a smaller PDF.");
        e.target.value = "";
        setFileName("");
        return;
      }
      setFileName(file.name);
    }
  };

  const handleGenerateReport = async () => {
    setFormError("");
    const resumeFile = resumeInputRef.current?.files?.[0];

    if (!jobDescription.trim()) {
      setFormError("Please enter the job description to continue.");
      return;
    }

    if (jobDescription.trim().length < 20) {
      setFormError("Please enter a more detailed job description (at least 20 characters).");
      return;
    }

    setActiveStep(0);

    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      if (data?._id) {
        navigate(`/report/${data._id}`);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Failed to generate interview report. Please try again.";
      setFormError(msg);
    }
  };

  const handleLogoutUser = async () => {
    await handleLogout();
    navigate("/login");
  };

  /* Loading State */
  if (generatingReport) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-6 text-slate-900">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Progress Bar */}
          <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-indigo-50">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    index < activeStep
                      ? "bg-indigo-600 text-white"
                      : index === activeStep
                      ? "border-2 border-indigo-600 text-indigo-600"
                      : "border border-slate-200 text-slate-400"
                  }`}
                >
                  {index < activeStep ? "✓" : index + 1}
                </div>

                <span
                  className={`text-sm font-medium ${
                    index === activeStep
                      ? "text-slate-900 font-semibold"
                      : index < activeStep
                      ? "text-slate-500"
                      : "text-slate-300"
                  }`}
                >
                  {step}
                  {index === activeStep ? "..." : ""}
                </span>

                {index === activeStep && (
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    Running
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Analyzing with Gemini 2.5 Flash. This takes 20–30 seconds.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar with real user & logout */}
      <Navbar onLogout={handleLogoutUser} user={user} />

      {/* Page Header */}
      <Header user={user} />

      {/* Main Workspace */}
      <main className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        {formError && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{formError}</span>
          </div>
        )}

        <InterviewWorkspace
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          selfDescription={selfDescription}
          setSelfDescription={setSelfDescription}
          fileName={fileName}
          resumeInputRef={resumeInputRef}
          handleFileChange={handleFileChange}
          onGenerate={handleGenerateReport}
        />

        {reportsLoading ? (
          <section className="mt-16">
            <div className="mb-7">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Recent Reports
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Loading your previous interview strategies...
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs animate-pulse space-y-4"
                >
                  <div className="h-5 w-40 rounded bg-slate-200" />
                  <div className="h-4 w-24 rounded bg-slate-100" />
                  <div className="h-6 w-20 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </section>
        ) : reports.length > 0 ? (
          <section className="mt-16">
            <div className="mb-7">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Recent Reports
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                View and continue your previously generated interview plans.
              </p>
            </div>

            <RecentReports reports={reports} />
          </section>
        ) : null}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
