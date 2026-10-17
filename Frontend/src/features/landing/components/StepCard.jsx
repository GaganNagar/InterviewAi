import React from "react";
import { motion } from "framer-motion";

const StepCard = ({ step, index = 0 }) => {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Icon Sphere */}
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-indigo-100 bg-white text-indigo-600 shadow-xs transition-transform duration-200 hover:scale-105">
        <Icon className="h-8 w-8" />
      </div>

      {/* Step Number Tag */}
      <div className="relative z-10 -mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white shadow-xs">
        {step.number}
      </div>

      {/* Content */}
      <div className="mt-4 max-w-xs">
        <h3 className="text-base font-bold text-slate-900">
          {step.title}
        </h3>

        <div className="mx-auto my-2.5 h-0.5 w-6 rounded-full bg-indigo-600" />

        <p className="text-xs leading-relaxed text-slate-600">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

export default StepCard;