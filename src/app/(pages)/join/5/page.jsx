"use client";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Join5 = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useJoin();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (user?.password !== confirmPassword) {
      setError("Password didn't match");
      return;
    }

    toast.loading("Please wait...");
    try {
      const res = await axios.post("/api/users/register", user);
      toast.dismiss();
      if (res.status >= 400) {
        toast.error(res?.response?.data?.error || "Something went wrong");
        router.push("/join/1");
      }
      toast.success(res?.data?.message);
      router.push("/");
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.error || error?.message);
      router.push("/join/1");
    }
  };
  return (
    <div className="card w-full max-w-sm shrink-0 mb-10">
      <Title>Create Password</Title>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Create Password</span>
            {error && (
              <span className="label-text text-error font-bold">{error}</span>
            )}
          </label>
          <input
            type="password"
            placeholder="e.g. aA@123456"
            className="input input-bordered input-accent"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="e.g. aA@123456"
            className="input input-bordered input-accent"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center justify-between my-5">
          <Link href="/join/4" type="reset" className="btn btn-accent">
            Previous
          </Link>
          <button type="submit" className="btn btn-accent">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join5;
