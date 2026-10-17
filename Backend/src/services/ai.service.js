const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
    console.warn("⚠️ Warning: Neither GOOGLE_GENAI_API_KEY nor GOOGLE_API_KEY is defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

// Target model as specified by Google Gemini API recommendations
const PRIMARY_MODEL = "gemini-3.8-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap: low, medium, or high")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan"),
        tasks: z.array(z.string()).describe("List of concrete tasks to be done on this day")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The target job title or role synthesized from the job description"),
});

/**
 * Executes a Gemini content generation call with primary model and automatic fallback.
 */
async function generateWithFallback({ prompt, schema, systemInstruction }) {
    const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL];
    let lastError = null;

    for (const model of modelsToTry) {
        try {
            const config = {
                responseMimeType: "application/json",
            };
            if (schema) {
                config.responseSchema = zodToJsonSchema(schema);
            }
            if (systemInstruction) {
                config.systemInstruction = systemInstruction;
            }

            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config,
            });

            if (response && response.text) {
                return { text: response.text, modelUsed: model };
            }
        } catch (err) {
            console.warn(`[AI Service] Model ${model} generation failed: ${err.message}. Checking fallback...`);
            lastError = err;
        }
    }

    throw new Error(`AI generation failed across all available models: ${lastError ? lastError.message : "Unknown error"}`);
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Analyze this candidate's background against the job description and generate a complete interview strategy report.
Resume: ${resume || "Not provided"}
Self Description: ${selfDescription || "Not provided"}
Job Description: ${jobDescription}
`;

    const result = await generateWithFallback({
        prompt,
        schema: interviewReportSchema,
        systemInstruction: "You are an expert technical interviewer, talent acquisition leader, and career coach. Provide deeply insightful, actionable, realistic questions, accurate skill gaps, and a comprehensive 7-day preparation roadmap tailored to the target role."
    });

    try {
        const parsed = JSON.parse(result.text);
        // Validate with Zod
        const validated = interviewReportSchema.parse(parsed);
        return validated;
    } catch (parseError) {
        console.error("[AI Service] Failed to parse or validate interview report schema:", parseError);
        throw new Error("AI returned an invalid report structure. Please retry generation.");
    }
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage"
        ],
    });

    try {
        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0",
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "15mm",
                bottom: "15mm",
                left: "15mm",
                right: "15mm",
            },
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The complete HTML content of the ATS-optimized resume")
    });

    const prompt = `Generate an ATS-friendly, professional, human-sounding resume HTML for a candidate applying to this role:
Candidate Resume Content: ${resume || "Not provided"}
Candidate Self Description: ${selfDescription || "Not provided"}
Target Job Description: ${jobDescription}

Requirements:
- The response must be a JSON object with a single string field 'html'.
- Structure with clean, modern CSS in a <style> block: clean typography, elegant hierarchy, clean borders, high contrast.
- Ensure the layout is ATS-friendly, fits standard A4 pages cleanly, highlights relevant skills, metrics, and experience directly addressing the target job.
- Avoid generic filler. Emphasize strong action verbs and tangible achievements.
`;

    const result = await generateWithFallback({
        prompt,
        schema: resumePdfSchema,
        systemInstruction: "You are a senior executive resume writer and ATS specialist. Write clean, elegant, standard HTML resumes ready for PDF conversion."
    });

    let jsonContent;
    try {
        jsonContent = JSON.parse(result.text);
    } catch (err) {
        throw new Error("Failed to parse resume HTML from AI response");
    }

    if (!jsonContent.html) {
        throw new Error("AI did not produce valid resume HTML content");
    }

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };