import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, LogOut, ChevronDown } from "lucide-react";

const Navbar = ({ onLogout, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const displayName = user?.username || "Candidate";
  const displayEmail = user?.email || "";
  const displayAvatar = user?.avatar;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand */}
        <Link to="/home" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Interview<span className="text-indigo-600">AI</span>
          </span>
        </Link>

        {/* Right - Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 rounded-full p-1 pl-2.5 transition-colors hover:bg-slate-50 border border-slate-200"
          >
            <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
              {displayName}
            </span>

            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={displayName}
                className="h-8 w-8 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                {initial}
              </div>
            )}

            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black/5 z-50">
              <div className="border-b border-slate-100 px-4 py-2.5">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {displayName}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {displayEmail}
                </p>
              </div>

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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;