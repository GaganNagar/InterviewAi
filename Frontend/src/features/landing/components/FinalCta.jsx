import React from "react";
import { Link } from "react-router";

const FinalCta = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="rounded-3xl bg-indigo-600 px-6 py-16 text-center shadow-lg sm:px-12 sm:py-20">
          
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Prepare Smarter for Your Next Interview?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Start your personalized interview preparation with InterviewAI
            and focus on what matters for your target role.
          </p>

          <Link
            to="/register"
            className="group mt-8 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm transition-all duration-200 hover:bg-indigo-50 hover:shadow-md"
          >
            Get Started
            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default FinalCta;