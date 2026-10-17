import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    reportsLoading,
    setReportsLoading,
    reportLoading,
    setReportLoading,
    resumeLoading,
    setResumeLoading,
  } = context;

  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
      if (response?.interviewReport) {
        setReport(response.interviewReport);
      }
    } catch (error) {
      console.error("Generate report error:", error);
      throw error;
    } finally {
      setLoading(false);
    }

    return response?.interviewReport || null;
  };

  const getReportById = async (interviewId) => {
    setReportLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);
      if (response?.interviewReport) {
        setReport(response.interviewReport);
      }
    } catch (error) {
      console.error("Get report error:", error);
      throw error;
    } finally {
      setReportLoading(false);
    }
    return response?.interviewReport || null;
  };

  const getReports = async () => {
    setReportsLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      setReports(response?.interviewReports || []);
    } catch (error) {
      console.error("Get all reports error:", error);
    } finally {
      setReportsLoading(false);
    }

    return response?.interviewReports || [];
  };

  const getResumePdf = async (interviewReportId) => {
    setResumeLoading(true);
    try {
      const response = await generateResumePdf({ interviewReportId });
      const blob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `optimized_resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF resume:", error);
      throw error;
    } finally {
      setResumeLoading(false);
    }
  };

  return {
    loading,
    report,
    setReport,
    reports,
    setReports,
    reportsLoading,
    reportLoading,
    resumeLoading,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};