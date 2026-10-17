import React, { useState } from "react";
import { ChevronDown, Copy, Check, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QuestionCard = ({ question, index }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    const textToCopy = `Question: ${question.question}\n\nInterviewer Intention: ${question.intention}\n\nModel Answer: ${question.answer}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-b border-slate-100 last:border-b-0 bg-white transition-colors hover:bg-slate-50/50">
      {/* Question Header Bar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-4 px-6 py-4 text-left transition-colors"
      >
        {/* Number Badge */}
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-xs font-bold text-indigo-600 mt-0.5">
          {index + 1}
        </span>

        {/* Question Text */}
        <span className="flex-1 text-sm font-semibold leading-relaxed text-slate-800">
          {question.question}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 ml-2 mt-0.5">
          <button
            type="button"
            onClick={handleCopy}
            title="Copy question and model answer"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>

          <div
            className={`flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180 text-indigo-600" : ""
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </button>

      {/* Answer & Intention Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-5 space-y-4">
              {/* Intention */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-indigo-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                    Why the Interviewer Asks This
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  {question.intention}
                </p>
              </div>

              {/* Model Answer */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                    Recommended Model Answer & Approach
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                  {question.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionCard;