import React from "react";
import { Map, ChevronRight } from "lucide-react";
import RoadmapDay from "./RoadmapDay";

const Roadmap = ({ roadmap = [] }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Map className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              7-Day Preparation Roadmap
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              A focused plan to prepare for your target role
            </p>
          </div>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {roadmap.length} Days
        </span>

      </div>


      {/* Roadmap */}
      <div className="px-6 py-6">
        {roadmap.length > 0 ? (
          <div>
            {roadmap.map((day, index) => (
              <RoadmapDay
                key={day.day || index}
                day={day}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-slate-400">
            No preparation roadmap available.
          </div>
        )}
      </div>


      {/* Footer */}
      {roadmap.length > 7 && (
        <div className="border-t border-slate-100 px-6 py-4">
          <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
            View full roadmap
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

    </section>
  );
};

export default Roadmap;