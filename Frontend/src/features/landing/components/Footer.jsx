import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              Interview<span className="text-indigo-500">AI</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              AI-powered interview preparation tailored to your target role.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Product
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#features"
                className="w-fit text-sm text-slate-400 transition-colors hover:text-white"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="w-fit text-sm text-slate-400 transition-colors hover:text-white"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Account
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-fit text-sm text-slate-400 transition-colors hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="w-fit text-sm text-slate-400 transition-colors hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-500">
            © 2026 InterviewAI. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;