import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-6 text-slate-800">
        <div className="flex w-full max-w-sm flex-col items-center text-center">
          {/* Spinner */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100">
            <div className="h-5 w-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          </div>

          <h1 className="text-base font-semibold tracking-tight text-slate-900">
            Preparing your workspace
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Verifying your session...
          </p>

          <div className="mt-5 h-1 w-44 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 rounded-full bg-indigo-600 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;