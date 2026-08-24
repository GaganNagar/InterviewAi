import React from "react";
import {
  LayoutDashboard,
  Code2,
  MessageCircle,
  Map,
  Target,
  FileText,
  Mic,
  Bookmark,
  ChevronDown,
  Download,
} from "lucide-react";

const ReportSidebar = ({
  activeNav,
  setActiveNav,
  onDownloadResume,
}) => {
  const navItems = [
    {
      id: "technical",
      label: "Technical Questions",
      icon: Code2,
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      icon: MessageCircle,
    },
    {
      id: "roadmap",
      label: "Road Map",
      icon: Map,
    },
    {
      id: "skills",
      label: "Skill Gaps",
      icon: Target,
    },
    {
      id: "resume",
      label: "Resume Review",
      icon: FileText,
    },
    {
      id: "mock",
      label: "Mock Interview",
      icon: Mic,
    },
    {
      id: "saved",
      label: "Saved Reports",
      icon: Bookmark,
    },
  ];

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">

      {/* Brand */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Interview<span className="text-indigo-600">AI</span>
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Report
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-[17px] w-[17px] shrink-0" />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Resume Download */}
        <div className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">

          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
            <FileText className="h-4 w-4" />
          </div>

          <h3 className="text-sm font-semibold text-slate-900">
            ATS Friendly Resume
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Download your optimized resume for this role.
          </p>

          <button
            onClick={onDownloadResume}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <Download className="h-3.5 w-3.5" />
            Download Resume
          </button>
        </div>
      </div>




      {/* User */}
      <div className="border-t border-slate-100 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-50">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
            G
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              Gagan Nagar
            </p>

            <p className="truncate text-xs text-slate-400">
              Interview Candidate
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-400" />

        </button>
      </div>

    </aside>
  );
};

export default ReportSidebar;