import Title from "@/components/Title";
import UserApprovalTable from "@/components/Admin/UserApprovalTable";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { FaUserCircle, FaSearch } from "react-icons/fa";

export const dynamic = "force-dynamic";

const UserApproval = async () => {
  await connectDB();
  
  const users = await UserModel.find({}).sort({ createdAt: -1 }).lean();
  
  const serializedUsers = users.map(user => ({
    ...user,
    _id: user._id.toString(),
    societies: user.societies || [],
    roles: user.roles || [],
    society_designations: user.society_designations || [],
  }));

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <Title>Member Management</Title>
          <p className="text-base-content/60 mt-1">
            Manage pending registrations and active members
          </p>
        </div>
      </div>

      {/* @ts-ignore */}
      <UserApprovalTable initialUsers={serializedUsers} />
    </div>
  );
};

export default UserApproval;
