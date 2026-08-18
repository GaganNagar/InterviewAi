import React from "react";
import StepCard from "./StepCard";

import {
  UserRoundPlus,
  FileUp,
  FileChartColumn,
  Target,
} from "lucide-react";

const steps = [
  {
    icon: UserRoundPlus,
    title: "Add Your Details",
    description:
      "Tell us about yourself, your experience, skills, and the role you're targeting.",
    number: "01",
  },
  {
    icon: FileUp,
    title: "Upload Resume & JD",
    description:
      "Upload your resume and job description so InterviewAI can understand the match.",
    number: "02",
  },
  {
    icon: FileChartColumn,
    title: "Generate Your Report",
    description:
      "Get your personalized analysis with match score, skill gaps, questions, and roadmap.",
    number: "03",
  },
  {
    icon: Target,
    title: "Prepare & Improve",
    description:
      "Use your personalized questions and 7-day roadmap to prepare for your target role.",
    number: "04",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            <span>✦</span>
            HOW IT WORKS
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Simple Steps to Smarter{" "}
            <span className="text-indigo-600">
              Interview Preparation
            </span>
          </h2>

        </div>

        {/* Steps */}
        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              step={step}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;