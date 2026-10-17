import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ feature, index = 0 }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md flex flex-col justify-between"
    >
      <div>
        {/* Icon */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
          <Icon className="h-5 w-5" />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {feature.title}
        </h3>

        <div className="my-3 h-0.5 w-8 rounded-full bg-indigo-600" />

        {/* Description */}
        <p className="text-xs leading-relaxed text-slate-600">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;