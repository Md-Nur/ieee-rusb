"use client";
import Title from "@/components/Title";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaSearch, FaUserCircle, FaEnvelope, FaPhone, FaUndo } from "react-icons/fa";
import Loading from "@/components/Loading";

const UserApproval = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users"); // Fetch all users
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, isApproved) => {
    setProcessingId(id);
    const action = isApproved ? "Approving" : "Unapproving";
    const toastId = toast.loading(`${action} user...`);
    try {
      await axios.post(`/api/users/user-approval`, {
        id,
        isApproved,
      });
      
      // Update local state
      setUsers(users.map(u => u._id === id ? { ...u, isApproved } : u));
      
      toast.update(toastId, {
        render: `User ${isApproved ? "approved" : "unapproved"} successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error?.response?.data?.error || `Failed to ${action.toLowerCase()} user`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id, name) => {
    if (!window.confirm(`Are you sure you want to reject and DELETE ${name}'s registration?`)) return;

    setProcessingId(id);
    const toastId = toast.loading("Rejecting user...");
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.update(toastId, {
        render: "User request rejected and deleted.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error?.response?.data?.error || "Failed to reject user",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setProcessingId(null);
    }
  };

  const pendingUsers = users?.filter(u => !u.isApproved) || [];
  const approvedUsers = users?.filter(u => u.isApproved) || [];

  const displayUsers = activeTab === "pending" ? pendingUsers : approvedUsers;

  const filteredUsers = displayUsers.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.dept?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <Title>Member Management</Title>
          <p className="text-base-content/60 mt-1">
            Manage pending registrations and active members
          </p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-base-content/50">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or dept..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6 bg-base-200 p-1 self-start inline-flex">
        <button 
          className={`tab tab-lg ${activeTab === "pending" ? "tab-active !bg-primary !text-primary-content" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending <div className="badge badge-sm ml-2 bg-base-100/20 border-none">{pendingUsers.length}</div>
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "approved" ? "tab-active !bg-accent !text-accent-content" : ""}`}
          onClick={() => setActiveTab("approved")}
        >
          Approved <div className="badge badge-sm ml-2 bg-base-100/20 border-none">{approvedUsers.length}</div>
        </button>
      </div>

      <div className="bg-base-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead className="bg-base-300">
              <tr>
                <th>Member</th>
                <th className="hidden lg:table-cell">Contact</th>
                <th>Academic/Role</th>
                <th className="hidden md:table-cell">Societies</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loading />
                  </td>
                </tr>
              ) : filteredUsers?.length ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-base-300/50 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 bg-base-100">
                            <Image
                              src={user?.avatar || "/defaultAvatar.jpg"}
                              width={48}
                              height={48}
                              alt={user?.name || "Avatar"}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">{user?.name}</div>
                          <div className="text-xs opacity-50 font-mono">{user?._id?.slice(-8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="flex items-center gap-2"><FaEnvelope className="text-primary text-xs"/> {user?.email}</span>
                        <span className="flex items-center gap-2"><FaPhone className="text-success text-xs"/> {user?.phone}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1 min-w-[150px]">
                        <div className="font-bold text-sm leading-tight text-primary">
                          {user?.dept}
                        </div>
                        <div className="text-xs font-medium opacity-60">
                          {user?.session || user?.designation}
                        </div>
                        <div className="badge badge-ghost badge-sm font-semibold h-auto py-1 px-2 text-center whitespace-normal">
                          {user?.position}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5 min-w-[180px] max-w-[250px]">
                        {user?.societies?.map((soc, i) => (
                          <span key={i} className="badge badge-accent badge-outline badge-sm capitalize h-auto py-1 px-2 text-center whitespace-normal font-medium">
                            {soc.split("-").join(" ")}
                          </span>
                        )) || <span className="text-xs opacity-30 italic">None</span>}
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.isApproved ? (
                          <button
                            className={`btn btn-sm btn-outline btn-warning gap-2 transition-all hover:scale-105 ${processingId === user._id ? 'loading' : ''}`}
                            onClick={() => handleStatusChange(user._id, false)}
                            disabled={!!processingId}
                          >
                            {!processingId && <FaUndo className="text-xs" />}
                            <span className="hidden sm:inline">Unapprove</span>
                          </button>
                        ) : (
                          <>
                            <button
                              className={`btn btn-sm btn-success gap-2 text-white transition-all hover:scale-105 ${processingId === user._id ? 'loading' : ''}`}
                              onClick={() => handleStatusChange(user._id, true)}
                              disabled={!!processingId}
                            >
                              {!processingId && <FaCheck className="text-xs" />}
                              <span>Approve</span>
                            </button>
                            <button
                              className={`btn btn-sm btn-error btn-outline gap-2 transition-all hover:scale-105 ${processingId === user._id ? 'loading' : ''}`}
                              onClick={() => handleReject(user._id, user.name)}
                              disabled={!!processingId}
                            >
                              {!processingId && <FaTimes className="text-xs" />}
                              <span className="hidden sm:inline">Reject</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-6xl text-base-content/20">
                        <FaUserCircle />
                      </div>
                      <div className="text-2xl font-bold opacity-40">
                        {searchTerm ? "No users match your search" : `No ${activeTab} members`}
                      </div>
                      {!searchTerm && (
                        <p className="opacity-40">
                          {activeTab === "pending" 
                            ? "All registration requests have been handled." 
                            : "There are no approved members yet."}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserApproval;
