import React from "react";
import { Mic, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const MockInterviewCard = ({ onStart }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Mic className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Practice
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Mock Interview
          </h2>
        </div>

      </div>


      {/* Intro */}
      <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">

        <div className="flex items-start gap-3">

          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Practice like the real interview
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Practice role-specific questions with AI and get
              feedback on your answers, communication, and
              overall interview performance.
            </p>
          </div>

        </div>

      </div>


      {/* Features */}
      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

          <span className="text-sm text-slate-600">
            Role-specific interview questions
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

          <span className="text-sm text-slate-600">
            AI-powered answer evaluation
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

          <span className="text-sm text-slate-600">
            Instant feedback and improvement tips
          </span>
        </div>

      </div>


      {/* CTA */}
      <button
        onClick={onStart}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Start Mock Interview

        <ArrowRight className="h-4 w-4" />
      </button>

    </section>
  );
};

export default MockInterviewCard;