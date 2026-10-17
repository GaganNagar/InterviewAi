import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-8 text-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-4 flex justify-center gap-6 text-xs font-medium text-slate-500">
          <Link to="/" className="transition-colors hover:text-indigo-600">
            Home
          </Link>
          <Link to="/home" className="transition-colors hover:text-indigo-600">
            Workspace
          </Link>
          <Link to="/profile" className="transition-colors hover:text-indigo-600">
            Profile
          </Link>
        </div>

        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} InterviewAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
