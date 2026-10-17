import React from "react";
import { Link } from "react-router";
import { Sparkles, ArrowRight, Zap, Target, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-indigo-50/60 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-16 sm:py-20 lg:flex-row lg:gap-14 lg:px-8 lg:py-24">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[50%]"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>AI-Powered Career & Interview Acceleration</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Prepare Smarter for Your Next{" "}
            <span className="text-indigo-600">Dream Role</span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Upload your resume and target job description. InterviewAI analyzes requirement gaps, drafts targeted technical & behavioral questions with model answers, and builds your custom 7-day preparation roadmap.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
            >
              <span>Start Free Preparation</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              See How It Works
            </a>
          </div>

          {/* Value Points */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-slate-100 pt-8">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Targeted Questions
                </h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                  Custom technical & behavioral questions with answers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  7-Day Plan
                </h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                  Structured day-by-day focus areas and tasks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  ATS Resume PDF
                </h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                  One-click tailored resume export ready for submission.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content / Report Preview Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full lg:w-[50%]"
        >
          <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50">
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <img
                src="/heroReport.png"
                alt="InterviewAI strategy report preview"
                className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;