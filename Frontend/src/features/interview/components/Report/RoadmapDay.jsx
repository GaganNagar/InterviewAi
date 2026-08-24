import React, { useState } from "react";
import { ChevronDown, CheckCircle2, Circle } from "lucide-react";

const RoadmapDay = ({ day, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-b-0">

      {/* Day Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-slate-50"
      >

        {/* Day Number */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
          {index + 1}
        </div>

        {/* Day Info */}
        <div className="min-w-0 flex-1">

          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
            Day {index + 1}
          </p>

          <h3 className="mt-0.5 truncate text-sm font-semibold text-slate-800">
            {day.focus}
          </h3>

        </div>

        {/* Arrow */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180 text-indigo-600" : ""
          }`}
        />

      </button>


      {/* Details */}
      {open && (
        <div className="ml-[52px] pb-5 pr-6">

          {/* Focus */}
          {day.focus && (
            <div className="mb-4 rounded-lg bg-slate-50 p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Focus
              </p>

              <p className="text-sm leading-6 text-slate-600">
                {day.focus}
              </p>
            </div>
          )}

          {/* Tasks */}
          {day.tasks && (
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Tasks
              </p>

              {Array.isArray(day.tasks) ? (
                <div className="space-y-2">
                  {day.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />

                      <p className="text-sm leading-6 text-slate-600">
                        {task}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-slate-600">
                  {day.tasks}
                </p>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default RoadmapDay;