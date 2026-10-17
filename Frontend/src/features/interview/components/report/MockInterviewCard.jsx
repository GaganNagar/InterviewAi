import React, { useState } from "react";
import { Mic, MicOff, Sparkles, ArrowRight, CheckCircle2, Play, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

const MockInterviewCard = ({ onStart }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordedTime(0);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Mic className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Interactive Practice
              </span>
              <span className="rounded-full bg-indigo-100/60 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                Beta
              </span>
            </div>
            <h2 className="mt-0.5 text-lg font-bold text-slate-900">
              AI Mock Interview Simulation
            </h2>
          </div>
        </div>
      </div>

      {/* Intro Box */}
      <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Simulate Live Technical & Behavioral Questions
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Practice answering questions aloud in a realistic interview environment. The AI analyzes your verbal delivery, keyword depth, and answer structure to generate targeted feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Microphone Test Preview */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
        <p className="text-xs font-semibold text-slate-700 mb-3">
          Audio Response Test Station
        </p>

        <div className="flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggleRecording}
            className={`flex h-16 w-16 items-center justify-center rounded-full transition-all shadow-md ${
              isRecording
                ? "bg-red-600 text-white animate-pulse"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>

          <span className="text-xs font-medium text-slate-500">
            {isRecording
              ? "Recording in progress... Click again to finish"
              : "Click microphone to test audio response"}
          </span>
        </div>
      </div>

      {/* Feature Checklist */}
      <div className="mt-6 space-y-2.5">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span className="text-xs font-medium text-slate-700">
            Real-time answer analysis & speech cadence feedback
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span className="text-xs font-medium text-slate-700">
            STAR method (Situation, Task, Action, Result) evaluation
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span className="text-xs font-medium text-slate-700">
            Immediate model answer comparison and refinement suggestions
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-indigo-700"
      >
        <span>Launch Full Mock Interview Session</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.section>
  );
};

export default MockInterviewCard;