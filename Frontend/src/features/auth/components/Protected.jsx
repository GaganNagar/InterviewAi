import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-darkBg px-6 text-white">
      <div className="flex w-full max-w-sm flex-col items-center text-center">

        {/* Logo / Brand */}
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
          <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>

        {/* Text */}
        <h1 className="text-lg font-semibold tracking-tight">
          Preparing your workspace
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Verifying your session...
        </p>

        {/* Progress */}
        <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-primary animate-pulse" />
        </div>

      </div>
    </main>
  );
}

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;