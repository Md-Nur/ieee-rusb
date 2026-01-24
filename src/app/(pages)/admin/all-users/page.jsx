"use client";
import Title from "@/components/Title";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";

const positions = [
  "Counselor",
  "Advisor",
  "Senior member",
  "Alumni",
  "Chairperson",
  "Vice Chair",
  "General Sec",
  "Ass GS",
  "Treasuerer",
  "Webmaster",
  "Programm coordinator",
  "Graphic Designer",
  "Content Development",
  "Membership Development",
  "Public Relation",
  "Photographer",
  "Publication coordinator",
  "Volunteer",
  "Other",
];

const depts = [
  "Electrical & Electronic Engineering",
  "Computer Science & Engineering",
  "Materials Science & Engineering",
  "Information & Communication Engineering",
  "Applied Chemistry & Chemical Engineering",
  "Others",
];

const academicDesignations = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Other",
];

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  // For Edit Modal
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit]);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`/api/users?approved=true&page=${currentPage}&limit=${limit}`) // Fetch users with pagination
      .then((res) => {
        if (Array.isArray(res.data)) {
           // Fallback if API returns array (should not happen with new logic but good for safety)
           setUsers(res.data);
           setTotalPages(1);
        } else {
           setUsers(res.data.users);
           setTotalPages(res.data.pagination.totalPages);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData(user);
    document.getElementById("edit_modal").showModal();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Sanitize data: Remove internal and sensitive fields
      const { _id, __v, createdAt, updatedAt, id, password, ...updateData } = formData;
      
      await axios.put(`/api/users/${editUser._id}`, updateData);
      toast.success("User updated successfully");
      document.getElementById("edit_modal").close();
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Failed to update user");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-5">
      <Title>All Users</Title>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>IEEE ID</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src={user.avatar || "/defaultAvatar.jpg"}
                          alt={user.name}
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.dept}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.ieee_id || "N/A"}</td>
                <td>{user.position}</td>
                <td>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <div className="join">
          <button 
            className="join-item btn" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">Page {currentPage} of {totalPages}</button>
          <button 
            className="join-item btn" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-2xl border-b pb-2">Edit User Profile</h3>
          <p className="text-sm opacity-60 mb-4">Manage branch and society positions for this member.</p>
          <form onSubmit={handleSave} className="py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="form-control">
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">Phone</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">IEEE ID</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.ieee_id || ""}
                onChange={(e) => setFormData({ ...formData, ieee_id: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">Department</label>
              <select
                className="select select-bordered w-full"
                value={formData.dept || ""}
                onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
              >
                <option value="">Select Department</option>
                {depts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">Session</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.session || ""}
                onChange={(e) => setFormData({ ...formData, session: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">Main Branch Position</label>
              <select
                className="select select-bordered w-full"
                value={formData.position || ""}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              >
                <option value="">Select Position</option>
                {positions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">Designation (Academic/Professional)</label>
              <select
                className="select select-bordered w-full"
                value={formData.designation || ""}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              >
                <option value="">Select Designation</option>
                {academicDesignations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h4 className="font-semibold mb-2">Society Designations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.societies?.map((soc) => {
                  const existing = formData.society_designations?.find(sd => sd.society === soc);
                  return (
                    <div key={soc} className="form-control border p-3 rounded-lg">
                      <label className="label py-0 mb-1 font-medium capitalize">{soc.replace(/-/g, " ")}</label>
                      <select
                        className="select select-bordered select-sm w-full"
                        value={existing?.designation || ""}
                        onChange={(e) => {
                          const newDesignation = e.target.value;
                          let newSocietyDesignations = [...(formData.society_designations || [])];
                          const index = newSocietyDesignations.findIndex(sd => sd.society === soc);
                          
                          if (index > -1) {
                            if (newDesignation) {
                              newSocietyDesignations[index] = { ...newSocietyDesignations[index], designation: newDesignation };
                            } else {
                              newSocietyDesignations.splice(index, 1);
                            }
                          } else if (newDesignation) {
                            newSocietyDesignations.push({ society: soc, designation: newDesignation });
                          }
                          
                          setFormData({ ...formData, society_designations: newSocietyDesignations });
                        }}
                      >
                        <option value="">No Position</option>
                        {positions.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
                {(!formData.societies || formData.societies.length === 0) && (
                  <p className="text-sm opacity-60">User is not a member of any society.</p>
                )}
              </div>
            </div>
            
            <div className="modal-action md:col-span-2">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" className="btn" onClick={()=>document.getElementById("edit_modal").close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AllUsers;
