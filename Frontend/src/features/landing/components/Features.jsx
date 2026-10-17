import React from "react";
import FeatureCard from "./FeatureCard";
import {
  FileSearch,
  FileCheck,
  MessageCircleQuestion,
  ChartNoAxesColumnIncreasing,
  Sparkles,
} from "lucide-react";

const featuresData = [
  {
    title: "Resume & JD Fit Analysis",
    description:
      "Deeply inspect your resume against job requirements to calculate an algorithmic ATS match score and highlight gaps.",
    icon: FileSearch,
  },
  {
    title: "Targeted ATS Resume Export",
    description:
      "Generate and download an ATS-compliant, formatted PDF resume specifically optimized for the target job.",
    icon: FileCheck,
  },
  {
    title: "Technical & Behavioral Coaching",
    description:
      "Review role-specific questions with interviewer intention analysis and structured model answers.",
    icon: MessageCircleQuestion,
  },
  {
    title: "7-Day Actionable Roadmap",
    description:
      "Follow an interactive day-by-day plan with concrete tasks to prepare methodically before your interview.",
    icon: ChartNoAxesColumnIncreasing,
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-slate-50 py-20 sm:py-24 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>INTELLIGENT SUITE</span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need to Ace Your Next{" "}
            <span className="text-indigo-600">Interview</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            InterviewAI transforms stressful preparation into a structured, data-driven journey tailored to your exact target role.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;