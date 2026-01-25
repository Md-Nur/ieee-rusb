"use client";
export const dynamic = "force-dynamic";
import Title from "@/components/Title";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { positions, depts, deptShorthands } from "@/lib/constants";
import { FaSearch, FaUserShield, FaChevronLeft, FaChevronRight } from "react-icons/fa";




const academicDesignations = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Other",
];

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  linkedin?: string;
  position: string;
  isAdmin: boolean;
  societies: string[];
  dept: string;
  session?: string;
  ieee_id?: string;
  society_designations?: { society: string; designation: string }[];
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  password?: string;
}

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  // For Edit Modal
  const [formData, setFormData] = useState<Partial<User>>({});

  // Debouncing Search
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedDept]);

  // Fetch users when filters or page changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit, debouncedSearch, selectedDept]);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("/api/users", {
        params: {
          approved: true,
          page: currentPage,
          limit: limit,
          search: debouncedSearch,
          dept: selectedDept,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
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

  const handleEdit = (user: User) => {
    setEditUser(user);
    setFormData(user);
    const modal = document.getElementById("edit_modal") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Edit modal not found in DOM");
      toast.error("Internal Error: UI Protocol failed to initialize.");
    }
  };





  const handleSave = async (e: any) => {
    if (!editUser) return;
    e.preventDefault();
    const toastId = toast.loading("Updating member registry...");
    try {
      const { _id, __v, createdAt, updatedAt, id, password, ...updateData } = formData;
      await axios.put(`/api/users/${editUser._id}`, updateData);
      toast.update(toastId, { render: "Registry synchronized successfully!", type: "success", isLoading: false, autoClose: 3000 });
      (document.getElementById("edit_modal") as HTMLDialogElement | null)?.close();
      fetchUsers();
    } catch (error: any) {
      toast.update(toastId, { render: error?.response?.data?.error || "Failed to synchronize registry", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <main className="">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 relative z-10 space-y-12">
        {/* Cinematic Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                 <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] opacity-70">Administrative Terminal</span>
              </div>
              <Title className="!p-0 !m-0 !text-left lg:text-5xl !leading-tight tracking-tighter bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent animate-text-shimmer">Verified_Members</Title>
              <p className="text-slate-600 dark:text-slate-400 font-medium max-w-xl text-sm leading-relaxed antialiased">
                 Execute administrative protocols and synchronize member identities across the global RUSB synchronization matrix.
              </p>
           </div>
           
           <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <div className="relative group w-full md:w-80">
                 <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-primary transition-colors z-20"><FaSearch /></span>
                 <input 
                    type="text" 
                    placeholder="Search Identity Registry..." 
                    className="input input-bordered w-full h-14 pl-12 bg-white/20 dark:bg-white/5 border-black/5 dark:border-white/10 rounded-2xl font-bold shadow-sm focus:ring-4 focus:ring-primary/10 backdrop-blur-3xl transition-all duration-300 placeholder:opacity-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <select 
                 className="select select-bordered h-14 bg-white/20 dark:bg-white/5 border-black/5 dark:border-white/10 rounded-2xl font-bold shadow-sm focus:ring-4 focus:ring-primary/10 w-full md:w-auto backdrop-blur-3xl transition-all duration-300"
                 value={selectedDept}
                 onChange={(e) => setSelectedDept(e.target.value)}
              >
                 <option value="">All Technical Sectors</option>
                 {depts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
           </div>
        </header>

        {/* Data Matrix Area */}
        {loading ? (
          <div className="py-32 flex flex-col items-center gap-6">
             <div className="relative">
                <Loading />
                <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10 animate-pulse" />
             </div>
             <p className="font-mono text-xs font-black tracking-[0.4em] text-primary/60 animate-pulse">ESTABLISHING_LINK...</p>
          </div>
        ) : (
          <div className="relative group/matrix">
            <div className="overflow-x-auto">
              <table className="table table-lg w-full border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-slate-500 dark:text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] border-none">
                    <th className="py-2 pl-0 bg-transparent">Digital_Persona</th>
                    <th className="bg-transparent">Link_Protocols</th>
                    <th className="bg-transparent">Registry_ID</th>
                    <th className="bg-transparent">Active_Status</th>
                    <th className="text-right pr-0 bg-transparent">Operational_Control</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? users.map((user) => (
                    <tr key={user._id} className="group/row transition-all duration-500 hover:-translate-y-1">
                      <td className="py-6 pl-8 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md rounded-l-[2rem] border-y border-l border-black/[0.03] dark:border-white/[0.05] group-hover/row:bg-white/60 dark:group-hover/row:bg-white/[0.07] group-hover/row:border-primary/20 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="relative mask mask-squircle w-20 h-20 shadow-2xl ring-4 ring-white dark:ring-slate-800 transition-transform duration-500 group-hover/row:scale-110">
                             <Image
                               src={user.avatar || "/defaultAvatar.jpg"}
                               alt={user.name}
                               width={80}
                               height={80}
                               className="object-cover w-full h-full"
                             />
                             {user.isAdmin && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-[10px] text-white shadow-lg ring-2 ring-white dark:ring-slate-900 z-10">
                                   <FaUserShield />
                                </div>
                             )}
                          </div>
                          <div className="space-y-1">
                            <div className="font-black text-lg text-slate-900 dark:text-white capitalize group-hover/row:text-primary transition-colors">{user.name}</div>
                            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{deptShorthands[user.dept] || user.dept}</div>
                          </div>
                        </div>
                      </td>
                      <td className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-md border-y border-black/[0.03] dark:border-white/[0.05] group-hover/row:bg-white/60 dark:group-hover/row:bg-white/[0.07] group-hover/row:border-primary/20 transition-all">
                         <div className="flex flex-col gap-0.5">
                            <span className="text-slate-900 dark:text-slate-200 font-black text-sm tracking-tight">{user.email}</span>
                            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">{user.phone}</span>
                         </div>
                      </td>
                      <td className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-md border-y border-black/[0.03] dark:border-white/[0.05] group-hover/row:bg-white/60 dark:group-hover/row:bg-white/[0.07] group-hover/row:border-primary/20 transition-all">
                         <span className="font-mono text-[11px] font-black text-primary/80 bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">
                            {user.ieee_id || "UNASSIGNED"}
                         </span>
                      </td>
                      <td className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-md border-y border-black/[0.03] dark:border-white/[0.05] group-hover/row:bg-white/60 dark:group-hover/row:bg-white/[0.07] group-hover/row:border-primary/20 transition-all">
                          <div className="px-4 py-2 bg-slate-100/50 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/10 inline-flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/row:animate-ping" />
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">{user.position}</span>
                          </div>
                      </td>
                      <td className="py-6 pr-8 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md rounded-r-[2rem] border-y border-r border-black/[0.03] dark:border-white/[0.05] group-hover/row:bg-white/60 dark:group-hover/row:bg-white/[0.07] group-hover/row:border-primary/20 transition-all text-right">
                        <button
                          className="btn btn-sm h-10 bg-primary/10 dark:bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary hover:text-white transition-all duration-500 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/5 px-6"
                          onClick={() => handleEdit(user)}
                        >
                          Modify_Record
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                       <td colSpan={5} className="py-32 text-center">
                          <div className="text-7xl font-black text-slate-300 dark:text-white/5 tracking-tighter">NULL_DATA</div>
                          <p className="font-mono text-[10px] font-black uppercase tracking-[0.5em] mt-4 text-slate-500 dark:text-slate-400">Registry query returned zero linked identities.</p>
                       </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <footer className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 px-6 py-8 bg-white/20 dark:bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-black/[0.03] dark:border-white/[0.05] shadow-inner">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                 <span className="text-[10px] font-mono font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.4em]">
                    Terminal_View: {currentPage} / {totalPages} Pages_Synchronized
                 </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="btn btn-circle h-12 w-12 bg-white/40 dark:bg-white/[0.05] border border-black/5 dark:border-white/10 rounded-2xl hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-10 group shadow-sm backdrop-blur-md" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  title="Previous Synchronization Batch"
                >
                  <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                
                <div className="h-12 px-8 flex items-center justify-center font-mono font-black text-sm bg-primary/10 text-primary border border-primary/20 rounded-2xl shadow-[inset_0_0_15px_rgba(var(--primary-rgb),0.1)] backdrop-blur-md relative overflow-hidden group">
                   <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                   {currentPage.toString().padStart(2, '0')}
                </div>
                
                <button 
                  className="btn btn-circle h-12 w-12 bg-white/40 dark:bg-white/[0.05] border border-black/5 dark:border-white/10 rounded-2xl hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-10 group shadow-sm backdrop-blur-md" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  title="Next Synchronization Batch"
                >
                  <FaChevronRight className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </footer>
          </div>
        )
      }   {/* Edit Identity Matrix Modal */}
        <dialog id="edit_modal" className="modal backdrop-blur-sm">
          <div className="modal-box w-11/12 max-w-5xl bg-white dark:bg-slate-900 p-0 rounded-[3rem] border border-black/5 dark:border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <header className="bg-primary/5 p-8 border-b border-black/5 dark:border-white/5">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-4 bg-primary rounded-full" />
                  <span className="text-[9px] font-mono font-black text-primary/60 uppercase tracking-[0.4em]">Protocol Override</span>
               </div>
               <h3 className="text-3xl font-black text-slate-800 dark:text-white font-display tracking-tight uppercase">Edit Identity Matrix</h3>
               <p className="text-slate-500 font-medium text-sm mt-1">Modifying global affiliation and rank metrics for security clearance.</p>
            </header>
            
            <form onSubmit={handleSave} className="p-8 md:p-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity: Name</label>
                    <input type="text" className="input input-bordered w-full h-14 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold border-black/5 dark:border-white/10 focus:ring-2 focus:ring-primary/20" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comm: Link_Email</label>
                    <input type="email" className="input input-bordered w-full h-14 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold border-black/5 dark:border-white/10 focus:ring-2 focus:ring-primary/20" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comm: Link_Phone</label>
                    <input type="text" className="input input-bordered w-full h-14 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold border-black/5 dark:border-white/10 focus:ring-2 focus:ring-primary/20" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registry: IEEE_ID</label>
                    <input type="text" className="input input-bordered w-full h-14 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold border-black/5 dark:border-white/10 focus:ring-2 focus:ring-primary/20" value={formData.ieee_id || ""} onChange={(e) => setFormData({ ...formData, ieee_id: e.target.value })} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Node: Department</label>
                    <select className="select select-bordered h-14 w-full bg-slate-50 dark:bg-white/5 rounded-2xl font-bold border-black/5 dark:border-white/10 focus:ring-2 focus:ring-primary/20" value={formData.dept || ""} onChange={(e) => setFormData({ ...formData, dept: e.target.value })}>
                       {depts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Record: Session</label>
                    <input type="text" className="input input-bordered w-full h-14 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold border-black/5 dark:border-white/10 focus:ring-2 focus:ring-primary/20" value={formData.session || ""} onChange={(e) => setFormData({ ...formData, session: e.target.value })} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rank: Branch_Position</label>
                    <select className="select select-bordered h-14 w-full bg-slate-50 dark:bg-white/5 rounded-2xl font-bold border-black/5 dark:border-white/10 focus:ring-2 focus:ring-primary/20" value={formData.position || ""} onChange={(e) => setFormData({ ...formData, position: e.target.value })}>
                       {positions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security: Clearance</label>
                    <label className={`flex items-center justify-between h-14 px-6 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold border transition-all cursor-pointer ${formData.isAdmin ? 'border-primary/40 bg-primary/5 shadow-inner' : 'border-black/5 dark:border-white/10 opacity-70'}`}>
                       <span className={`text-[11px] uppercase tracking-widest ${formData.isAdmin ? 'text-primary' : 'text-slate-500'}`}>Administrative Privileges</span>
                       <input type="checkbox" className="toggle toggle-primary toggle-sm" checked={formData.isAdmin || false} onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })} />
                    </label>
                 </div>
              </div>
              
              <section className="border-t border-black/5 dark:border-white/5 pt-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-6 h-[2px] bg-accent" />
                   <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight italic">Sector Specific Designations</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formData.societies?.map((soc) => {
                    const existing = formData.society_designations?.find(sd => sd.society === soc);
                    return (
                      <div key={soc} className="group/field relative p-6 bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl hover:border-primary/30 transition-all shadow-sm">
                        <label className="text-[9px] font-black text-primary uppercase tracking-widest mb-3 block">{soc.replace(/-/g, " ")}</label>
                        <select
                          className="select select-bordered select-sm w-full bg-white dark:bg-slate-800 rounded-xl font-bold"
                          value={existing?.designation || ""}
                          onChange={(e) => {
                            const newDesignation = e.target.value;
                            let newSocietyDesignations = [...(formData.society_designations || [])];
                            const index = newSocietyDesignations.findIndex(sd => sd.society === soc);
                            if (index > -1) {
                              if (newDesignation) newSocietyDesignations[index] = { ...newSocietyDesignations[index], designation: newDesignation };
                              else newSocietyDesignations.splice(index, 1);
                            } else if (newDesignation) {
                              newSocietyDesignations.push({ society: soc, designation: newDesignation });
                            }
                            setFormData({ ...formData, society_designations: newSocietyDesignations });
                          }}
                        >
                          <option value="">Inactive</option>
                          {positions.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </section>
              
              <div className="modal-action flex flex-col md:flex-row gap-4">
                <button type="submit" className="w-full md:w-auto btn btn-primary h-auto py-5 px-16 rounded-2xl shadow-2xl shadow-primary/20 font-black uppercase text-[10px] tracking-[0.2em]">Synchronize Identity</button>
                <button type="button" className="w-full md:w-auto px-10 py-5 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-slate-600 transition-colors" onClick={()=>(document.getElementById("edit_modal") as HTMLDialogElement | null)?.close()}>Abort Protocol</button>
              </div>
            </form>
          </div>
        </dialog>


      </div>
    </main>
  );
};

export default AllUsers;
