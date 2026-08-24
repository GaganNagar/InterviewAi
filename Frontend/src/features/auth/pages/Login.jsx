import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { 
    loading:signingIn, 
    handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({ email, password });
    navigate("/home");
  };

  if (signingIn) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
            <div className="h-5 w-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          </div>

          <h1 className="text-lg font-semibold text-slate-900">
            Signing you in
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Verifying your account...
          </p>

          <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 rounded-full bg-indigo-600 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

          {/* Brand */}
          <div className="mb-8 text-center">
            <p className="text-sm font-bold tracking-tight text-indigo-600">
              InterviewAI
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to continue preparing for your interview.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={signingIn}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Sign in
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-slate-400">
            Secure access to your interview workspace
          </p>

        </div>
      </div>
    </main>
  );
};

export default Login;