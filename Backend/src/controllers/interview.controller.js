const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description is required"
            })
        }

        let resumeText = ""
        if (req.file) {
            try {
                const parsed = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
                resumeText = parsed.text || ""
            } catch (pdfErr) {
                console.error("PDF parsing error:", pdfErr)
                // Fallback attempt with direct buffer parse if needed
                try {
                    const data = await pdfParse(req.file.buffer)
                    resumeText = data.text || ""
                } catch (e) {
                    console.error("Fallback PDF parse also failed:", e)
                }
            }
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })

    } catch (error) {
        console.error("Generate Report Error:", error);
        let friendlyMessage = "Server error generating interview report. Please try again.";
        const msg = error?.message || "";
        if (msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("429")) {
            friendlyMessage = "AI API quota or rate limit reached. Please wait a moment and try again.";
        } else if (msg.includes("high demand") || msg.includes("UNAVAILABLE") || msg.includes("503")) {
            friendlyMessage = "The AI model is experiencing temporary high demand. Please try again shortly.";
        } else if (msg.includes("invalid report structure")) {
            friendlyMessage = "AI returned an incomplete report structure. Please retry generation.";
        }
        return res.status(500).json({
            message: friendlyMessage
        });
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        if (!interviewId || interviewId === "undefined") {
            return res.status(400).json({
                message: "Invalid Interview ID"
            })
        }

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })

    } catch (error) {
        console.error("Get Report By ID Error:", error)
        return res.status(500).json({
            message: "Server error fetching interview report"
        })
    }
}

/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        console.error("Get All Reports Error:", error)
        return res.status(500).json({
            message: "Server error fetching reports"
        })
    }
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        // Secure check: verify ownership
        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user.id
        })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        return res.send(pdfBuffer)
    } catch (error) {
        console.error("Generate Resume PDF Error:", error)
        return res.status(500).json({
            message: "Server error generating resume PDF"
        })
    }
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}