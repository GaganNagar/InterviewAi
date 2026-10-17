import React, { useState } from "react";
import { Code2, MessageCircle, Search, HelpCircle } from "lucide-react";
import QuestionCard from "./QuestionCard";
import { motion } from "framer-motion";

const QuestionsSection = ({
  title,
  questions = [],
  type,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isTechnical = type === "technical";
  const Icon = isTechnical ? Code2 : MessageCircle;

  const filteredQuestions = questions.filter(
    (q) =>
      q.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.intention?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              {title}
            </h2>
            <p className="text-xs text-slate-500">
              Role-targeted questions with rationale and answers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          {questions.length > 3 && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
          )}

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 border border-indigo-100">
            {filteredQuestions.length} {filteredQuestions.length === 1 ? "Question" : "Questions"}
          </span>
        </div>
      </div>

      {/* Question List */}
      <div className="divide-y divide-slate-100">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              index={index}
            />
          ))
        ) : (
          <div className="px-6 py-12 text-center">
            <HelpCircle className="mx-auto h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-600">
              {searchTerm ? "No matching questions found" : "No questions available"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {searchTerm ? "Try searching with different keywords" : "Questions will appear once generated."}
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default QuestionsSection;