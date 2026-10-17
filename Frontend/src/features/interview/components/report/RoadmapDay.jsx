import React, { useState } from "react";
import { ChevronDown, CheckCircle2, Circle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RoadmapDay = ({ day, index, completedTasks = {}, onToggleTask }) => {
  const [open, setOpen] = useState(index === 0); // Open Day 1 by default

  const tasksList = Array.isArray(day.tasks) ? day.tasks : [day.tasks].filter(Boolean);
  const dayNumber = day.day || index + 1;

  // Count completed tasks for this day
  const dayCompletedCount = tasksList.reduce((acc, _, taskIdx) => {
    const key = `${dayNumber}-${taskIdx}`;
    return completedTasks[key] ? acc + 1 : acc;
  }, 0);

  const isDayFullyComplete = tasksList.length > 0 && dayCompletedCount === tasksList.length;

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      {/* Day Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50/70"
      >
        {/* Day Number Badge */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
            isDayFullyComplete
              ? "bg-emerald-100 text-emerald-700"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {isDayFullyComplete ? "✓" : dayNumber}
        </div>

        {/* Day Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              Day {dayNumber}
            </span>
            {tasksList.length > 0 && (
              <span className="text-[10px] font-medium text-slate-400">
                • {dayCompletedCount}/{tasksList.length} tasks completed
              </span>
            )}
          </div>

          <h3 className="mt-0.5 truncate text-sm font-semibold text-slate-900">
            {day.focus}
          </h3>
        </div>

        {/* Arrow */}
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180 text-indigo-600" : ""
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      {/* Details Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 space-y-4">
              {/* Daily Focus Callout */}
              {day.focus && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                    Day Goal & Objective
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-700">
                    {day.focus}
                  </p>
                </div>
              )}

              {/* Tasks Checklist */}
              {tasksList.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Preparation Tasks (Click to check off)
                  </p>

                  <div className="space-y-2">
                    {tasksList.map((task, taskIndex) => {
                      const taskKey = `${dayNumber}-${taskIndex}`;
                      const isChecked = !!completedTasks[taskKey];

                      return (
                        <div
                          key={taskIndex}
                          onClick={() => onToggleTask && onToggleTask(taskKey)}
                          className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                            isChecked
                              ? "border-emerald-200 bg-emerald-50/40 text-slate-500"
                              : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/20"
                          }`}
                        >
                          <button
                            type="button"
                            className="mt-0.5 shrink-0"
                            aria-label={isChecked ? "Mark incomplete" : "Mark complete"}
                          >
                            {isChecked ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Circle className="h-4 w-4 text-slate-400 hover:text-indigo-600" />
                            )}
                          </button>

                          <p
                            className={`text-xs leading-relaxed ${
                              isChecked ? "line-through text-slate-400" : "font-medium"
                            }`}
                          >
                            {task}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoadmapDay;