"use client";
import Title from "@/components/Title";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Admin = () => {
  const [users, setUsers] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/users?approved=false")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleApproved = async (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    try {
      if (e.target.checked) {
        await axios.post(`/api/user-approval`, {
          id,
          isApproved: true,
        });
      } else {
        await axios.post(`/api/user-approval`, {
          id,
          isApproved: false,
        });
      }
    } catch (error: unknown | any) {
      e.target.checked = !e.target.checked;
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  return (
    <div>
      <Title>User Approval</Title>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Approved</th>
              <th>Name</th>
              <th>
                Department <br /> & Session
              </th>
              <th>
                Email <br /> & Phone
              </th>
              <th>Roles</th>
              <th>Societies</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              users?.length ? (
                users.map((user) => (
                  <tr className="hover" key={user._id}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-accent"
                          onChange={(e) => handleApproved(e, user._id)}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex flex-col items-center gap-1">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {/* <Image
                              src={user?.avatar || "/defaultAvatar.jpg"}
                              width={50}
                              height={50}
                              alt={user?.name || "Avatar"}
                            /> */}
                            <img
                            src={user?.avatar || "/defaultAvatar.jpg"}
                            alt={user?.name || "Avatar"}
                            className="h-12 w-12"
                          />
                          </div>
                        </div>
                        <div>
                          <div>{user?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user?.dept || "N/A"}
                      <br />
                      {user?.session || "N/A"}
                    </td>
                    <td>
                      {user?.email}
                      <br />
                      {user?.phone}
                    </td>
                    <td>
                      <ul>
                        {user?.roles.map((role: string, i: number) => (
                          <li key={i} className="list-disc capitalize">
                            {role.split("-").join(" ")}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {user?.societies.map((society: string, i: number) => (
                          <li key={i} className="list-disc capitalize">
                            {society.split("-").join(" ")}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-error text-xl font-bold"
                  >
                    There have been no users to approve
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  <span className="loading loading-infinity loading-lg"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;