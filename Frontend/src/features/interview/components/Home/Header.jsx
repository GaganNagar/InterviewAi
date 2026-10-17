import React from "react";

const Header = ({ user }) => {
  const username = user?.username;

  return (
    <header className="bg-transparent">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 text-center lg:px-8">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">
          <span>✦</span>
          AI Interview Preparation & Strategy
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {username ? (
            <>
              Welcome back, <span className="text-indigo-600">{username}</span>
            </>
          ) : (
            <>
              Create Your <span className="text-indigo-600">Interview Plan</span>
            </>
          )}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Provide the target job description and your resume to generate customized questions, skill gap analysis, and a 7-day preparation roadmap.
        </p>
      </div>
    </header>
  );
};

export default Header;