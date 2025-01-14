"use client";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Join = () => {
  const { user, setUser } = useJoin();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (user.password !== confirmPassword) {
      setError("Password didn't match");
      return;
    }
    router.push("/join/2");
  };

  return (
    <div className="card w-full max-w-sm shrink-0 mb-10">
      <Title>Join Us</Title>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered input-accent"
            onBlur={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            placeholder="Phone"
            className="input input-bordered input-accent"
            onBlur={(e) => setUser({ ...user, phone: e.target.value })}
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
            className="input input-bordered input-accent"
            required
            onBlur={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Create Password</span>
            {error && (
              <span className="label-text text-error font-bold">{error}</span>
            )}
          </label>
          <input
            type="password"
            placeholder="Create Password"
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
            placeholder="Confirm Password"
            className="input input-bordered input-accent"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Join;
