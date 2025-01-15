"use client";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Join = () => {
  const { user, setUser } = useJoin();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.dept === "" ||
      user.session === "" ||
      user.phone === "" ||
      user.email === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    router.push("/join/2");
  };

  return (
    <div className="card w-full max-w-sm shrink-0">
      <Title>Join Us</Title>
      <form className="card-body mb-10" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered input-accent"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Department</span>
          </label>
          <input
            type="text"
            placeholder="Department"
            className="input input-bordered input-accent"
            onChange={(e) => setUser({ ...user, dept: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Session</span>
          </label>
          <input
            type="text"
            placeholder="Session"
            className="input input-bordered input-accent"
            onChange={(e) => setUser({ ...user, session: e.target.value })}
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
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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