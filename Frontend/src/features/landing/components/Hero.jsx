import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-16 sm:py-20 lg:flex-row lg:gap-14 lg:px-8 lg:py-24">

        {/* Left Content */}
        <div className="w-full lg:w-[48%]">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            <span>✦</span>
            AI-Powered Interview Preparation
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Prepare Smarter for Your Next{" "}
            <span className="text-indigo-600">Interview</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Upload your resume and job description to get a personalized
            interview report, skill gap analysis, interview questions, and a
            7-day preparation plan.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/register"
              className="group inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
            >
              Get Started
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              See How It Works
            </a>

          </div>

          {/* Value Points */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">

            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                ✦
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                Personalized Insights
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Get analysis tailored to your target job.
              </p>
            </div>

            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                ⚡
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                Instant Reports
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Turn your job requirements into preparation insights.
              </p>
            </div>

            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                ✓
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                Focused Preparation
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Follow a clear 7-day plan for your target role.
              </p>
            </div>

          </div>
        </div>

        {/* Report Preview */}
        <div className="w-full lg:w-[52%]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            <img
              src="/report_Preview.png"
              alt="InterviewAI report preview"
              className="h-auto w-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;