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
      <div className="flex justify-evenly items-center my-10 flex-wrap gap-5 w-full">
        <div className="avatar">
          <div className="ring-accent ring-offset-base-100 w-full md:w-32 rounded-full ring ring-offset-2">
            <Image
              src={userAuth?.avatar || "/defaultAvatar.jpg"}
              alt={userAuth?.name || "User"}
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="grid gap-2 grid-cols-2">
          <h3 className="font-semibold">Email</h3>
          <p>{userAuth?.email}</p>

          <h3 className="font-semibold">Phone</h3>
          <p>{userAuth?.phone}</p>

          <h3 className="font-semibold">Department</h3>
          <p>{userAuth?.dept}</p>

          <h3 className="font-semibold">
            {userAuth?.session ? "Session" : "Designation"}
          </h3>
          <p>{userAuth?.session || userAuth?.designation}</p>
        </div>
        <div className="w-auto">
          <h3 className="font-semibold">Community</h3>
          <ul>
            {userAuth?.roles.map((role, i) => (
              <li key={i} className="list-disc">
                {role}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-auto">
          <h3 className="text-lg font-semibold">Society & AG</h3>
          <ul>
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
