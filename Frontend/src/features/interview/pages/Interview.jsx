import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useInterview } from "../hooks/useInterview.js";

import ReportSidebar from "../components/report/ReportSidebar.jsx";
import ReportHeader from "../components/report/ReportHeader.jsx";
import QuestionsSection from "../components/report/QuestionsSection.jsx";
import MatchScore from "../components/report/MatchScore.jsx";
import SkillGaps from "../components/report/SkillGaps.jsx";
import Roadmap from "../components/report/Roadmap.jsx";
import ResumeCard from "../components/report/ResumeCard.jsx";
import MockInterviewCard from "../components/report/MockInterviewCard.jsx";

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { getReportById, getResumePdf, loading, report } = useInterview();
  const [activeNav, setActiveNav] = useState("technical");


  useEffect(() => {
  const fetchReport = async () => {
    try {
      await getReportById(interviewId);
    } catch (error) {
      console.error("Failed to fetch report:", error);
    }
  };

  fetchReport();
}, [interviewId]);


  const handleDownloadResume = async () => {
    await getResumePdf(interviewId);
  };

  const handleBack = () => {
    navigate("/home");
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
        return <Roadmap roadmap={report.roadmap || []} />;

      case "skills":
        return <SkillGaps skillGaps={report.skillGaps || []} />;

      case "resume":
        return (
          <ResumeCard
            onDownload={handleDownloadResume}
            resumeName={report.title || "Your Resume"}
          />
        );

      case "mock":
        return (
          <MockInterviewCard
            onStart={() => {
              console.log("Mock interview started");
            }}
          />
        );

      case "saved":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              Saved Reports
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Saved reports will be available here.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm font-medium text-slate-500">
          Loading interview report...
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
            This interview report could not be loaded.
          </p>

          <button
            onClick={handleBack}
            className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <ReportSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onDownloadResume={handleDownloadResume}
        />

        {/* Main */}
        <main className="min-w-0 flex-1">

          {/* Header */}
          <ReportHeader
            title={report.title}
            createdAt={report.createdAt}
            onBack={handleBack}
          />

          {/* Content */}
          <div className="mx-auto max-w-6xl p-6 lg:p-8">

            {/* Active Section */}
            {renderActiveSection()}

            {/* Insights */}
            {(activeNav === "technical" ||
              activeNav === "behavioral") && (
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

                <MatchScore score={report.matchScore || 0} />

                <SkillGaps
                  skillGaps={report.skillGaps || []}
                />

              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  );
};

export default Interview;