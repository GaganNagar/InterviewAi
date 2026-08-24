import React from "react";
import { Code2, MessageCircle, ChevronRight } from "lucide-react";
import QuestionCard from "./QuestionCard";

const QuestionsSection = ({
  title,
  questions = [],
  type,
}) => {
  const isTechnical = type === "technical";
  const Icon = isTechnical ? Code2 : MessageCircle;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {title}
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Personalized questions based on your profile
            </p>
          </div>

        </div>

        {/* Count */}
        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
          {questions.length} Questions
        </span>

      </div>


      {/* Questions */}
      <div className="divide-y divide-slate-100">

        {questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              index={index}
            />
          ))
        ) : (
          <div className="px-6 py-10 text-center text-sm text-slate-400">
            No questions available.
          </div>
        )}

      </div>


      {/* Footer */}
      {questions.length > 5 && (
        <div className="border-t border-slate-100 px-6 py-4">

          <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
            View all questions
            <ChevronRight className="h-4 w-4" />
          </button>

        </div>
      )}

    </section>
  );
};

export default QuestionsSection;