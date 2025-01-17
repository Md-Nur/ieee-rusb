"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { PiLinkedinLogoBold } from "react-icons/pi";

const ShowUsers = ({ query }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/api/users?query=${query}&approved=true`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="flex max-w-7xl justify-center gap-5 flex-wrap mx-auto">
      {!loading ? (
        users.length ? (
          users.map((user) => (
            <div
              key={user._id}
              className="card bg-base-300 w-full max-w-96 shadow-xl"
            >
              <figure>
                <img
                  src={user?.avatar || "/defaultAvatar.jpg"}
                  height={400}
                  width={400}
                  alt={user?.name}
                  className="object-cover max-h-80"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-3xl font-bold text-center">{user?.name}</h2>
                {user?.position && (
                  <p className="text-center text-lg">{user.position}</p>
                )}
                <p>Department of {user?.dept}</p>
                <p>
                  {user?.designation ? "Designation" : "Session"}:&nbsp;
                  {user?.designation || user?.session}
                </p>
                <div className="card-actions justify-center mt-3">
                  {user?.phone && (
                    <a href={`tel:${user?.phone}`} target="_blank">
                      <MdOutlinePhone className="text-3xl text-accent" />
                    </a>
                  )}
                  {user?.email && (
                    <a href={`mailto:${user?.email}`} target="_blank">
                      <MdOutlineMailOutline className="text-accent text-3xl" />
                    </a>
                  )}
                  {user?.linkedin && (
                    <a href={user?.linkedin} target="_blank">
                      <PiLinkedinLogoBold className="text-accent text-3xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-error">No Users Found</h1>
        )
      ) : (
        <span className="loading loading-infinity loading-lg"></span>
      )}
    </div>
  );
};

export default ShowUsers;
