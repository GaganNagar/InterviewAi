import React, { useState, useRef, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth.js";

import Navbar from "../components/Home/Navbar.jsx";
import Header from "../components/Home/Header.jsx";
import InterviewWorkspace from "../components/Home/InterviewWorkspace.jsx";
import RecentReports from "../components/Home/RecentReports.jsx";
import Footer from "../components/Home/Footer.jsx";

const steps = [
  "Reading Resume",
  "Analyzing Job Description",
  "Identifying Skill Gaps",
  "Generating Questions",
];

const Home = () => {
  const {
    loading: generatingReport,
    reportsLoading,
    generateReport,
    reports,
  } = useInterview();

  console.log("HOME generatingReport:", generatingReport);
  const { handleLogout } = useAuth();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    if (generatingReport) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [generatingReport]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
    }
  };

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    setActiveStep(0);

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    if (data?._id) {
      navigate(`/report/${data._id}`);
    }
  };

  const handleLogoutUser = async () => {
    const success = await handleLogout();
    if (success) {
      navigate("/");
    }
  };

  /* Loading Screen */
  if (generatingReport) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 text-slate-900">
        <div className="w-full max-w-md">
          {/* Progress */}
          <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-indigo-50">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-700"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    index <= activeStep ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                />

                <span
                  className={`text-sm font-medium ${
                    index === activeStep
                      ? "text-slate-900"
                      : index < activeStep
                        ? "text-slate-500"
                        : "text-slate-300"
                  }`}
                >
                  {step}
                  {index === activeStep ? "..." : ""}
                </span>

                {index === activeStep && (
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-indigo-600">
                    In Progress
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 text-xs uppercase tracking-[0.25em] text-slate-400">
          AI is tailoring your strategy
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar onLogout={handleLogoutUser} />

      {/* Page Header */}
      <Header />

      {/* Interview Workspace */}
      <main className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
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
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Recent Reports
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Loading your recent interview reports...
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-4 animate-pulse">
                <div className="h-5 w-48 rounded bg-slate-200" />
                <div className="h-4 w-72 rounded bg-slate-100" />
                <div className="h-16 w-full rounded-xl bg-slate-100" />
                <div className="h-16 w-full rounded-xl bg-slate-100" />
              </div>
            </div>
          </section>
        ) : reports.length > 0 ? (
          <section className="mt-16">
            <div className="mb-7">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Recent Reports
              </h2>

              <p className="mt-1 text-sm text-slate-500">
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
