import React from "react";

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      
      {/* Icon */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon className="h-6 w-6" />
      </div>

      {/* Card Content */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {feature.title}
        </h3>

        <div className="my-4 h-px w-10 bg-indigo-600"></div>

        <p className="text-sm leading-6 text-slate-600">
          {feature.description}
        </p>
      </div>

    </div>
  );
};

export default FeatureCard;