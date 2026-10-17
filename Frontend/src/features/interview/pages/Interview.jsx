import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useInterview } from "../hooks/useInterview.js";
import { useAuth } from "../../auth/hooks/useAuth.js";

import ReportSidebar from "../components/report/ReportSidebar.jsx";
import ReportHeader from "../components/report/ReportHeader.jsx";
import QuestionsSection from "../components/report/QuestionsSection.jsx";
import MatchScore from "../components/report/MatchScore.jsx";
import SkillGaps from "../components/report/SkillGaps.jsx";
import Roadmap from "../components/report/Roadmap.jsx";
import ResumeCard from "../components/report/ResumeCard.jsx";
import MockInterviewCard from "../components/report/MockInterviewCard.jsx";

const mobileTabs = [
  { id: "technical", label: "Technical" },
  { id: "behavioral", label: "Behavioral" },
  { id: "roadmap", label: "Roadmap" },
  { id: "skills", label: "Skill Gaps" },
  { id: "resume", label: "Resume" },
  { id: "mock", label: "Mock AI" },
];

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const {
    getReportById,
    getResumePdf,
    report,
    reportLoading,
    resumeLoading,
  } = useInterview();

  const [activeNav, setActiveNav] = useState("technical");
  const [downloadError, setDownloadError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId).catch((err) => {
        console.error("Failed to fetch report:", err);
      });
    }
  }, [interviewId]);

  const handleDownloadResume = async () => {
    setDownloadError("");
    try {
      await getResumePdf(interviewId);
    } catch (err) {
      setDownloadError("Failed to download PDF resume. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleUserLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  const renderActiveSection = () => {
    if (!report) return null;

    switch (activeNav) {
      case "technical":
        return (
          <QuestionsSection
            title="Technical Questions"
            type="technical"
            questions={report.technicalQuestions || []}
          />
        );

      case "behavioral":
        return (
          <QuestionsSection
            title="Behavioral Questions"
            type="behavioral"
            questions={report.behavioralQuestions || []}
          />
        );

      case "roadmap":
        return <Roadmap roadmap={report.preparationPlan || []} />;

      case "skills":
        return <SkillGaps skillGaps={report.skillGaps || []} />;

      case "resume":
        return (
          <ResumeCard
            onDownload={handleDownloadResume}
            resumeLoading={resumeLoading}
            resumeName={report.title || "Target Role Resume"}
          />
        );

      case "mock":
        return (
          <MockInterviewCard
            onStart={() => {
              console.log("Mock interview simulation started");
            }}
          />
        );

      case "saved":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <h2 className="text-base font-semibold text-slate-900">
              Saved Reports & History
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              You can access all your saved reports from your workspace dashboard.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              Go to Workspace
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (reportLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">
            Loading interview report...
          </p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Report not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This interview report could not be found or you don't have permission to view it.
          </p>

          <button
            onClick={handleBack}
            className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-xs"
          >
            Back to Workspace
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Sidebar (Desktop + Mobile Drawer) */}
        <ReportSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onDownloadResume={handleDownloadResume}
          resumeLoading={resumeLoading}
          user={user}
          onLogout={handleUserLogout}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="min-w-0 flex-1 flex flex-col">
          {/* Header */}
          <ReportHeader
            title={report.title}
            createdAt={report.createdAt}
            onBack={handleBack}
            onDownload={handleDownloadResume}
            resumeLoading={resumeLoading}
            onToggleMobileNav={() => setMobileMenuOpen(true)}
          />

          {/* Mobile Horizontal Tabs */}
          <div className="flex md:hidden overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 gap-2 scrollbar-none sticky top-16 z-20">
            {mobileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveNav(tab.id)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeNav === tab.id
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {downloadError && (
            <div className="mx-auto w-full max-w-6xl px-6 pt-4">
              <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                {downloadError}
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8 flex-1">
            {/* Active Section */}
            {renderActiveSection()}

            {/* Supplementary Insights for technical/behavioral views */}
            {(activeNav === "technical" || activeNav === "behavioral") && (
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <MatchScore score={report.matchScore || 0} />
                <SkillGaps skillGaps={report.skillGaps || []} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Interview;