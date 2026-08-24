import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const QuestionCard = ({ question, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">

      {/* Question */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50"
      >
        {/* Number */}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-xs font-bold text-indigo-600">
          Q{index + 1}
        </span>

        {/* Question Text */}
        <span className="flex-1 text-sm font-medium leading-6 text-slate-700">
          {question.question}
        </span>

        {/* Arrow */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180 text-indigo-600" : ""
          }`}
        />
      </button>

      {/* Answer Content */}
      {open && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5">

          <div className="space-y-5">

            {/* Intention */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Intention
              </span>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {question.intention}
              </p>
            </div>

            {/* Model Answer */}
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Model Answer
              </span>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {question.answer}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default QuestionCard;