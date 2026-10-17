import React from "react";
import StepCard from "./StepCard";
import {
  UserRoundPlus,
  FileUp,
  FileChartColumn,
  Target,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: UserRoundPlus,
    title: "Paste Job Description",
    description:
      "Paste the complete target job description and requirements into the workspace.",
    number: "01",
  },
  {
    icon: FileUp,
    title: "Upload Resume (PDF)",
    description:
      "Upload your PDF resume and optionally add highlights of your key strengths.",
    number: "02",
  },
  {
    icon: FileChartColumn,
    title: "AI Synthesis & Analysis",
    description:
      "Gemini AI evaluates match percentage, discovers skill gaps, and formats questions.",
    number: "03",
  },
  {
    icon: Target,
    title: "Execute 7-Day Prep",
    description:
      "Follow your daily roadmap tasks, practice model answers, and export your ATS resume.",
    number: "04",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Four Steps to Complete{" "}
            <span className="text-indigo-600">Interview Readiness</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            From raw job posting to comprehensive interview mastery in less than 30 seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-16">
          {/* Connector Line - Desktop */}
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-0.5 bg-indigo-100 lg:block" />

          <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;