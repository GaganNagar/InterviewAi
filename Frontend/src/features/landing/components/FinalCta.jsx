import React from "react";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const FinalCta = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20"
        >
          {/* Subtle background circles */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-indigo-500/30 blur-2xl" />
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-indigo-700/40 blur-2xl" />

          <div className="relative z-10">
            <div className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/50 px-3.5 py-1 text-xs font-semibold text-indigo-100">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free to Get Started</span>
            </div>

            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Accelerate Your Interview Preparation?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-indigo-100 sm:text-base">
              Join candidates using InterviewAI to analyze requirements, identify critical blindspots, and interview with total confidence.
            </p>

            <Link
              to="/register"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-xs font-bold text-indigo-600 shadow-md transition-all duration-200 hover:bg-indigo-50 hover:shadow-lg"
            >
              <span>Create Your Free Interview Plan</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;