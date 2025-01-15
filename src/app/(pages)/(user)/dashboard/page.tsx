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
          <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
            <Image
              src={userAuth?.avatar || "defaultAvatar.jng"}
              alt={userAuth?.name || "User"}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p>{userAuth?.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Phone</h3>
            <p>{userAuth?.phone}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Department</h3>
            <p>{userAuth?.dept}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Session</h3>
            <p>{userAuth?.session}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Community</h3>
          <ul>
            {userAuth?.roles.map((role, i) => (
              <li key={i} className="list-disc">
                {role}
              </li>
            ))}
          </ul>
          <Link href="/add-blog" className="btn btn-accent my-2 btn-sm">Add Blog</Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Society & AG</h3>
          <ul>
            {userAuth?.societies.map((society, i) => (
              <li key={i} className="list-disc">
                {society}
              </li>
            ))}
          </ul>
          <Link href="/add-event" className="btn btn-accent my-2 btn-sm">Add Event</Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
