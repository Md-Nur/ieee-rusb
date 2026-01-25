"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Title from "@/components/Title";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      await axios.post("/api/auth/reset-password", { token, password });
      toast.success("Password reset successful! Please login with your new password.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-black/5 dark:border-white/5">
        <div className="text-center">
          <Title className="!text-3xl !mb-2">Reset Password</Title>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
                <label htmlFor="password" title="New Password" className="sr-only">
                New Password
                </label>
                <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-5 py-4 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-800 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="confirm-password" title="Confirm Password" className="sr-only">
                Confirm Password
                </label>
                <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-5 py-4 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-800 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
