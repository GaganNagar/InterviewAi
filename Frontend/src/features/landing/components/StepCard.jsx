import React from "react";

const StepCard = ({ step }) => {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center text-center">

      {/* Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-indigo-50 bg-white text-indigo-600 shadow-sm">
        <Icon className="h-10 w-10" />
      </div>

      {/* Step Number */}
      <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-sm">
        {step.number}
      </div>

      {/* Content */}
      <div className="mt-5 max-w-xs">

        <h3 className="text-lg font-semibold text-slate-900">
          {step.title}
        </h3>

        <div className="mx-auto my-4 h-1 w-10 rounded-full bg-indigo-600"></div>

        <p className="text-sm leading-6 text-slate-600">
          {step.description}
        </p>

      </div>

    </div>
  );
};

export default StepCard;