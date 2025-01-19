"use client";
import Title from "@/components/Title";
import { useUserAuth } from "@/context/userAuth";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { userAuth } = useUserAuth();
  return (
    <section className="w-full">
      <Title>{userAuth?.name || "User"}</Title>
      <div className="flex md:justify-evenly items-center my-10 flex-wrap gap-5 w-full justify-center">
        <div className="avatar">
          <div className="ring-accent ring-offset-base-100 w-full md:w-60 rounded-full ring ring-offset-2">
            <Image
              src={userAuth?.avatar || "/defaultAvatar.jpg"}
              alt={userAuth?.name || "User"}
              width={500}
              height={500}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              <tr>
                <th>Email</th>
                <td>{userAuth?.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{userAuth?.phone}</td>
              </tr>
              <tr>
                <th>Department</th>
                <td>{userAuth?.dept}</td>
              </tr>
              <tr>
                <th>Position</th>
                <td>{userAuth?.position}</td>
              </tr>
              <tr>
                <th>{userAuth?.session ? "Session" : "Designation"}</th>
                <td>{userAuth?.session || userAuth?.designation}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-auto space-y-5 mx-2">
          <h3 className="font-semibold">Community</h3>
          <ul className="space-y-5">
            {userAuth?.roles.map((role, i) => (
              <li key={i} className="list-disc">
                {role}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">Society & AG</h3>
          <ul className="space-y-5">
            {userAuth?.societies.map((society, i) => (
              <li key={i} className="list-disc">
                {society}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-center">
        <Link href="/add-blog" className="btn btn-accent my-2 btn-sm">
          Add Blog
        </Link>
        <Link href="/add-event" className="btn btn-accent my-2 btn-sm">
          Add Event
        </Link>
      </div>
    </section>
  );
};

export default Profile;
