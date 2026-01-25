"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaPhoneAlt, FaLock, FaArrowRight, FaEnvelope } from "react-icons/fa";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    phoneEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/users/login", formData);
      toast.success(res.data.message || "Welcome back!");
      
      // Force a full refresh or wait for cookie sync
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-black/5 dark:border-white/5 relative overflow-hidden group">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors"></div>

      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black font-display text-slate-800 dark:text-white uppercase tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 font-medium">
            Sign in to continue to IEEE RUSB
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Phone/Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FaEnvelope className="text-sm" />
              </div>
              <input
                type="text"
                name="phoneEmail"
                placeholder="Phone or Email"
                required
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
                value={formData.phoneEmail}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FaLock className="text-sm" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-widest transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-70"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                Login
                <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link
              href="/join/1"
              className="text-primary font-bold hover:underline transition-all"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
