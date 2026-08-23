import React from "react";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 text-center lg:px-8">

        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
          <span>✦</span>
          Interview Preparation
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Create Your{" "}
          <span className="text-indigo-600">
            Interview Plan
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Add the job description and your profile to get a personalized
          interview strategy.
        </p>

      </div>
    </header>
  );
};

export default Header;