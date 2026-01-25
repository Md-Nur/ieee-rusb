import Title from "@/components/Title";

export const metadata = {
  title: "User Approval",
};
import UserApprovalTable from "@/components/Admin/UserApprovalTable";
import React from "react";

export const dynamic = "force-dynamic";

const UserApproval = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL?.startsWith("http") 
    ? process.env.NEXT_PUBLIC_URL 
    : `http://${process.env.NEXT_PUBLIC_URL}`;

  const res = await fetch(`${baseUrl}/api/users`, {
    cache: "no-store",
  });

  let users = [];
  if (res.ok) {
    users = await res.json();
  } else {
    console.error("Failed to fetch users");
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <Title>Member Management</Title>
          <p className="text-base-content/60 mt-1">
            Review pending registrations and manage approved members
          </p>
        </div>
      </div>

      {/* @ts-ignore */}
      <UserApprovalTable initialUsers={users} />
    </div>
  );
};

export default UserApproval;
