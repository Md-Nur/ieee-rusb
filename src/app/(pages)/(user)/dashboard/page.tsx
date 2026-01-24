"use client";
export const dynamic = "force-dynamic";
import Title from "@/components/Title";
import { useUserAuth } from "@/context/userAuth";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaPlus, FaLinkedin, FaEnvelope, FaPhone, FaIdCard, FaUniversity, FaUserTag, FaMicrochip } from "react-icons/fa";
import Loading from "@/components/Loading";

const Profile = () => {
  const { userAuth } = useUserAuth();

  if (!userAuth) {
    return <Loading />;
  }

  return (
    <section className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Title>Personal Dashboard</Title>
        <div className="flex gap-2">
          <Link href="/dashboard/edit-profile" className="btn btn-accent btn-sm gap-2">
            <FaEdit /> Edit Profile
          </Link>
          <Link href="/add-blog" className="btn btn-primary btn-sm gap-2">
            <FaPlus /> Add Blog
          </Link>
          <Link href="/add-event" className="btn btn-secondary btn-sm gap-2">
            <FaPlus /> Add Event
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card bg-base-200 shadow-xl overflow-hidden">
            <div className="bg-primary h-24 w-full"></div>
            <div className="flex justify-center -mt-12 px-4">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 bg-base-100 overflow-hidden">
                  <Image
                    src={userAuth?.avatar || "/defaultAvatar.jpg"}
                    alt={userAuth?.name || "User"}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="card-body items-center text-center pt-2">
              <h2 className="card-title text-2xl font-bold">{userAuth?.name}</h2>
              <div className="badge badge-primary font-bold">{userAuth?.position}</div>
              <div className="flex flex-col gap-2 w-full mt-4 text-sm opacity-80">
                <div className="flex items-center justify-center gap-2">
                  <FaIdCard className="text-secondary" />
                  <span className="font-mono">IEEE ID: {userAuth?.ieee_id || "Not Provided"}</span>
                </div>
                {userAuth?.linkedin && (
                  <a 
                    href={userAuth.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-blue-500 hover:underline"
                  >
                    <FaLinkedin /> LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-lg border-b pb-2 mb-2">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <FaEnvelope />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs opacity-50 uppercase tracking-wider">Email</p>
                    <p className="font-medium truncate">{userAuth?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 p-2 rounded-lg text-success">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-xs opacity-50 uppercase tracking-wider">Phone</p>
                    <p className="font-medium">{userAuth?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Academic Info */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl gap-2 text-primary">
                <FaUniversity className="text-sm opacity-70" /> Academic & Professional
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                  <p className="text-xs opacity-50 mb-1">Department</p>
                  <p className="font-bold text-lg">{userAuth?.dept}</p>
                </div>
                <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                  <p className="text-xs opacity-50 mb-1">{userAuth?.session ? "Academic Session" : "Designation"}</p>
                  <p className="font-bold text-lg">{userAuth?.session || userAuth?.designation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Communities & Societies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg gap-2 text-secondary">
                    <FaUserTag className="text-sm opacity-70" /> General Roles
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {userAuth?.roles.map((role, i) => (
                      <span key={i} className="badge badge-outline badge-md capitalize py-3 px-4 h-auto font-medium">
                        {role.split("-").join(" ")}
                      </span>
                    ))}
                  </div>
                </div>
             </div>

             <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg gap-2 text-accent">
                    <FaMicrochip className="text-sm opacity-70" /> Societies & AGs
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {userAuth?.societies.length > 0 ? (
                      userAuth.societies.map((soc, i) => (
                        <span key={i} className="badge badge-accent badge-outline badge-md capitalize py-3 px-4 h-auto font-medium">
                          {soc.split("-").join(" ")}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm opacity-40 italic">Not a member of any society yet.</p>
                    )}
                  </div>
                </div>
             </div>
          </div>

          {/* Society-Specific Designations */}
          {userAuth?.society_designations && userAuth.society_designations.length > 0 && (
            <div className="card bg-base-200 shadow-xl border-t-4 border-accent">
              <div className="card-body">
                <h3 className="card-title">Society Specific Positions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  {userAuth.society_designations.map((sd, i) => (
                    <div key={i} className="card bg-base-100 p-4 border border-base-300">
                      <p className="text-xs opacity-50 capitalize mb-1">{sd.society.split("-").join(" ")}</p>
                      <p className="font-bold text-primary">{sd.designation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
