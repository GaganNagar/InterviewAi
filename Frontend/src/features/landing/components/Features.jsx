import React from "react";
import FeatureCard from "./FeatureCard";

import {
  FileSearch,
  FileCheck,
  MessageCircleQuestion,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

const featuresData = [
  {
    title: "Resume Analysis",
    description:
      "Analyze your resume against the job description and get insights to improve your chances.",
    icon: FileSearch,
  },
  {
    title: "ATS Resume",
    description:
      "Create an ATS-friendly resume tailored to your target role.",
    icon: FileCheck,
  },
  {
    title: "Interview Prep",
    description:
      "Get role-specific technical and behavioral questions to prepare with confidence.",
    icon: MessageCircleQuestion,
  },
  {
    title: "Skill Gaps & 7-Day Roadmap",
    description:
      "Identify your skill gaps and follow a personalized 7-day roadmap.",
    icon: ChartNoAxesColumnIncreasing,
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            <span>✦</span>
            FEATURES
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything You Need to Crack Your Next{" "}
            <span className="text-indigo-600">Interview</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            InterviewAI provides end-to-end support to help you analyze,
            prepare, and succeed in your interviews.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;