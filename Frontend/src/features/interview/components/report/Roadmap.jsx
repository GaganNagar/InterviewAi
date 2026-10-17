import React, { useState } from "react";
import { Map, CalendarCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import RoadmapDay from "./RoadmapDay";

const Roadmap = ({ roadmap = [] }) => {
  const [completedTasks, setCompletedTasks] = useState({});

  const handleToggleTask = (taskKey) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  // Calculate total tasks across all days
  const totalTasks = roadmap.reduce((acc, day) => {
    const list = Array.isArray(day.tasks) ? day.tasks : [day.tasks].filter(Boolean);
    return acc + list.length;
  }, 0);

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Map className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              7-Day Preparation Roadmap
            </h2>
            <p className="text-xs text-slate-500">
              Structured day-by-day plan to prepare thoroughly for your interview
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 border border-indigo-100">
            {roadmap.length} Days Planned
          </span>
        </div>
      </div>

      {/* Progress Banner */}
      {totalTasks > 0 && (
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <div className="flex items-center justify-between text-xs font-medium mb-2">
            <span className="text-slate-700 flex items-center gap-1.5 font-semibold">
              <CalendarCheck className="h-3.5 w-3.5 text-indigo-600" />
              Your Preparation Progress
            </span>
            <span className="text-indigo-600 font-bold">
              {completedCount} of {totalTasks} tasks ({progressPercent}%)
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Days List */}
      <div className="divide-y divide-slate-100">
        {roadmap.length > 0 ? (
          roadmap.map((day, index) => (
            <RoadmapDay
              key={day.day || index}
              day={day}
              index={index}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
            />
          ))
        ) : (
          <div className="py-12 text-center text-sm text-slate-400">
            No preparation roadmap available for this report.
          </div>
        )}
      </div>

      {/* Encouragement Footer */}
      {progressPercent === 100 && totalTasks > 0 && (
        <div className="border-t border-emerald-100 bg-emerald-50/60 p-4 text-center">
          <p className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Congratulations! You've completed all tasks in your 7-day interview plan.
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default Roadmap;