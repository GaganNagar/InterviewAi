import React from "react";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Brand */}
        <div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Interview<span className="text-indigo-600">AI</span>
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>

          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;