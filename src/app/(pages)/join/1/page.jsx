"use client";
import { useJoin } from "@/context/join";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Join = () => {
  const { user, setUser } = useJoin();
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    router.push("/join/2");
  };

  return (
    <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl my-10">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
            onBlur={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            required
            onBlur={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Create Password</span>
          </label>
          <input
            type="password"
            placeholder="Create Password"
            className="input input-bordered"
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
            placeholder="Confirm Password"
            className="input input-bordered"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Join;
