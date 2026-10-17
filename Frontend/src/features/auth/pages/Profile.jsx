import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import {
  User,
  Mail,
  Briefcase,
  Image,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const Profile = () => {
  const { user, handleUpdateProfile } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [headline, setHeadline] = useState(user?.headline || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const initial = (username || user?.username || "U").charAt(0).toUpperCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!username.trim()) {
      setFeedback({ type: "error", message: "Username cannot be empty." });
      return;
    }

    setIsSubmitting(true);
    const result = await handleUpdateProfile({
      username: username.trim(),
      headline: headline.trim(),
      avatar: avatar.trim(),
    });
    setIsSubmitting(false);

    if (result.success) {
      setFeedback({
        type: "success",
        message: "Profile updated successfully!",
      });
    } else {
      setFeedback({
        type: "error",
        message: result.error || "Failed to update profile.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Back Link */}
        <button
          onClick={() => navigate("/home")}
          className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Workspace
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          {/* Header Card */}
          <div className="border-b border-slate-100 bg-slate-50/50 p-6 sm:p-8">
            <div className="flex items-center gap-5">
              {avatar ? (
                <img
                  src={avatar}
                  alt={username}
                  className="h-20 w-20 rounded-full object-cover border-2 border-indigo-200 shadow-xs"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600 border-2 border-indigo-200">
                  {initial}
                </div>
              )}

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {user?.username || "Candidate Profile"}
                </h1>
                <p className="text-xs text-slate-500">{user?.email}</p>
                {user?.headline && (
                  <p className="mt-1 text-xs font-medium text-indigo-600">
                    {user.headline}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {feedback.message && (
              <div
                className={`flex items-center gap-2 rounded-xl p-3.5 text-xs font-medium border ${
                  feedback.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Email (Read only) */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 pl-10 pr-4 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Email cannot be modified.
              </p>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Full Name / Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Professional Headline */}
            <div>
              <label
                htmlFor="headline"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Professional Headline
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Briefcase className="h-4 w-4" />
                </div>
                <input
                  id="headline"
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer | React & Node.js"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Avatar URL */}
            <div>
              <label
                htmlFor="avatar"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Avatar Image URL (Optional)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Image className="h-4 w-4" />
                </div>
                <input
                  id="avatar"
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-indigo-700 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <span>Save Profile</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

