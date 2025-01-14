"use client";
import Title from "@/components/Title";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const { setUserAuth } = useUserAuth();
  const router = useRouter();
  const [user, setUser] = useState({
    phoneEmail: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    toast("Logging in...");
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", user);
      toast.dismiss();
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        setUserAuth(res.data?.user);
        toast.success(res.data?.message);
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  return (
    <div className="card w-full max-w-sm shrink-0 mb-10">
      <Title>Login</Title>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone or Email</span>
          </label>
          <input
            type="text"
            placeholder="Phone or Email"
            className="input input-bordered input-accent"
            onBlur={(e) => setUser({ ...user, phoneEmail: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered input-accent"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
