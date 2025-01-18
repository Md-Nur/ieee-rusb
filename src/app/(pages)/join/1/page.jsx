"use client";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Join = () => {
  const { user, setUser } = useJoin();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bdPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
    if (user.name === "" || user.email === "") {
      toast.error("Please fill all the fields");
      return;
    } else if (!bdPhoneRegex.test(user.phone)) {
      toast.error("Invalid Phone Number");
      return;
    }

    if (user.email && user.phone) {
      try {
        await axios.post("/api/users/existing-user", {
          email: user.email,
          phone: user.phone,
        });
      } catch (error) {
        toast.error(error?.response?.data?.error || "User already exists");
        return;
      }
    } else {
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Linkedin Profile Link</span>
          </label>
          <input
            type="url"
            placeholder="Linkedin Profile Url"
            className="input input-bordered input-accent"
            onChange={(e) => setUser({ ...user, linkedin: e.target.value })}
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
