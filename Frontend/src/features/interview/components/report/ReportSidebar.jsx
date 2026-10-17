import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Code2,
  MessageCircle,
  Map,
  Target,
  FileText,
  Mic,
  Bookmark,
  ChevronDown,
  Download,
  Loader2,
  User,
  LogOut,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReportSidebar = ({
  activeNav,
  setActiveNav,
  onDownloadResume,
  resumeLoading = false,
  user,
  onLogout,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
      label: "Preparation Roadmap",
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

  const displayName = user?.username || "Candidate";
  const displayEmail = user?.email || "";
  const displayAvatar = user?.avatar;
  const initial = displayName.charAt(0).toUpperCase();

  const handleSelectNav = (id) => {
    setActiveNav(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white">
      {/* Brand & Mobile Close */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
        <Link to="/home" className="text-xl font-bold tracking-tight text-slate-900">
          Interview<span className="text-indigo-600">AI</span>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Report Navigation
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectNav(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ATS Resume Download CTA */}
        <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
          <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-2xs">
            <FileText className="h-4 w-4" />
          </div>

          <h3 className="text-xs font-bold text-slate-900">
            ATS-Friendly Resume
          </h3>

          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
            Export the tailored PDF resume tailored to this role.
          </p>

          <button
            onClick={onDownloadResume}
            disabled={resumeLoading}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-indigo-700 disabled:opacity-60"
          >
            {resumeLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                <span>Download Resume</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* User Section with real auth data & dropdown */}
      <div className="relative border-t border-slate-100 p-3">
        {dropdownOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-50">
            <button
              onClick={() => {
                setDropdownOpen(false);
                navigate("/profile");
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <User className="h-4 w-4 text-slate-400" />
              <span>Profile Settings</span>
            </button>
            {onLogout && (
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        )}

        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-slate-50"
        >
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={displayName}
              className="h-8 w-8 shrink-0 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              {initial}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-slate-900">
              {displayName}
            </p>
            <p className="truncate text-[10px] text-slate-400">
              {displayEmail || user?.headline || "Candidate"}
            </p>
          </div>

          <ChevronDown
            className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Slide-in drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-72 max-w-full shadow-2xl z-50"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReportSidebar;