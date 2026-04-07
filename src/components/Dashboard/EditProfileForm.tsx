"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Title from "@/components/Title";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import Loading from "@/components/Loading";
import { positions, memberRoles, availableSocieties } from "@/lib/constants";
import { Users } from "@/models/user.model";



const EditProfileForm = ({ initialUser }: { initialUser?: Users | null }) => {
  const router = useRouter();
  const { userAuth, setUserAuth } = useUserAuth();
  // Use initialUser if available, otherwise fall back to context userAuth
  const currentUser = initialUser || userAuth;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUser?.avatar || null);
  const [loading, setLoading] = useState(false);
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>(currentUser?.societies || []);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(currentUser?.roles || []);
  const [societyDesignations, setSocietyDesignations] = useState<{ society: string; designation: string }[]>(currentUser?.society_designations || []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      linkedin: currentUser?.linkedin || "",
      ieee_id: currentUser?.ieee_id || "",
      position: currentUser?.position || "",
    }
  });

  // Sync with context updates if they happen (e.g. after save)
  useEffect(() => {
    if (userAuth && !initialUser) {
      reset({
        name: userAuth.name || "",
        phone: userAuth.phone || "",
        linkedin: userAuth?.linkedin || "",
        ieee_id: userAuth?.ieee_id || "",
        position: userAuth?.position || "",
      });
      setPreview(userAuth.avatar || null);
      setSelectedSocieties(userAuth.societies || []);
      setSelectedRoles(userAuth.roles || []);
      setSocietyDesignations(userAuth.society_designations || []);
    }
  }, [userAuth, reset, initialUser]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSocietyToggle = (socId: string) => {
    if (selectedSocieties.includes(socId)) {
      setSelectedSocieties(selectedSocieties.filter((id) => id !== socId));
      // Also remove designation if society is removed
      setSocietyDesignations(societyDesignations.filter((sd) => sd.society !== socId));
    } else {
      setSelectedSocieties([...selectedSocieties, socId]);
    }
  };

  const handleRoleToggle = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  const updateSocietyDesignation = (soc: string, designation: string) => {
    const updated = [...societyDesignations];
    const index = updated.findIndex((sd) => sd.society === soc);
    if (index > -1) {
      updated[index].designation = designation;
    } else {
      updated.push({ society: soc, designation });
    }
    setSocietyDesignations(updated);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const toastId = toast.loading("Updating profile...");

    try {
      let avatarUrl = userAuth?.avatar;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          formData
        );
        avatarUrl = imgResponse.data.data.url;
      }

      const updatePayload = {
        ...data,
        avatar: avatarUrl,
        societies: selectedSocieties,
        society_designations: societyDesignations,
        roles: selectedRoles,
      };

      const res = await axios.put("/api/users/profile", updatePayload);
      
      setUserAuth(res.data);
      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.update(toastId, {
        render: error?.response?.data?.error || "Failed to update profile",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userAuth) {
    return <Loading />;
  }

  return (
    <section className="w-full">
   
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full text-primary font-black text-[10px] tracking-[0.4em] uppercase border border-primary/20">
              Identity Matrix
           </div>
           <Title className="!p-0 !m-0 !text-center">Modify Profile</Title>
           <p className="text-slate-500 font-medium max-w-lg">Update your credentials and affiliation parameters within the IEEE RUSB nexus.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Avatar Projection Section */}
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-black/5 dark:border-white/10 p-10 flex flex-col items-center gap-8 shadow-2xl">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden ring-8 ring-slate-50 dark:ring-slate-800 shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                <Image
                  src={preview || "/defaultAvatar.jpg"}
                  alt="Avatar Preview"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <FaUpload />
                <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            <div className="text-center">
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Visual Component Output</p>
               <p className="text-[10px] font-bold text-slate-400 mt-1 italic">Click the icon to re-target image file</p>
            </div>
          </div>

          {/* Standard Parameters Matrix */}
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-black/5 dark:border-white/10 p-10 md:p-12 space-y-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="form-control w-full space-y-2">
                <label className="label-text font-black text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] ml-1">Identity: Full_Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className={`input input-bordered h-14 bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 ${errors.name ? 'input-error' : ''}`}
                  {...register("name", { required: "Name is required" })}
                />
              </div>

              <div className="form-control w-full space-y-2">
                <label className="label-text font-black text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] ml-1">Comm_Link: Phone</label>
                <input
                  type="text"
                  placeholder="+880..."
                  className={`input input-bordered h-14 bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 ${errors.phone ? 'input-error' : ''}`}
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: { value: /^\+?[0-9]\d{1,14}$/, message: "Invalid format" }
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-4">
              <div className="form-control w-full space-y-2">
                <label className="label-text font-black text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] ml-1">Registry: IEEE_ID</label>
                <input
                  type="text"
                  placeholder="Global Registry ID"
                  className={`input input-bordered h-14 bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 ${errors.ieee_id ? 'input-error' : ''}`}
                  {...register("ieee_id")}
                />
              </div>

              <div className="form-control w-full space-y-2">
                <label className="label-text font-black text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] ml-1">Rank: Position</label>
                <select
                  className={`select select-bordered select-sm w-full bg-white dark:bg-slate-800 rounded-xl font-bold ${errors.position ? 'input-error' : ''}`}
                  defaultValue={userAuth?.position || ""}
                  {...register("position")}
                >
                  <option value="">Select Role</option>
                  {positions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <p className="text-[9px] text-slate-400 italic ml-1">Select your current role/position</p>
              </div>
            </div>

            {/* Community Roles Checklist */}
            <div className="space-y-4 pt-8 border-t border-black/5 dark:border-white/5">
               <label className="label-text font-black text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] ml-1">Community: Roles (Check all that apply)</label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memberRoles.map((role) => (
                  <label key={role.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    selectedRoles.includes(role.id) 
                      ? 'bg-primary/5 border-primary/40 shadow-md shadow-primary/5' 
                      : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/5 opacity-60 hover:opacity-100'
                  }`}>
                    <span className="text-xs font-bold dark:text-slate-200">{role.label}</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-xs rounded-md"
                      checked={selectedRoles.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                    />
                  </label>
                ))}
               </div>
            </div>

            {/* Network Affiliation Selection */}
            <div className="space-y-6 pt-10 border-t border-black/5 dark:border-white/5">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Network Synchronization</p>
                <h3 className="text-xl font-black text-slate-800 dark:text-white font-display uppercase italic">Societies & Chapters</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableSocieties.map((soc) => (
                  <label key={soc.id} className={`flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    selectedSocieties.includes(soc.id) 
                      ? 'bg-primary/5 border-primary/40 shadow-lg shadow-primary/5' 
                      : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/5 opacity-60 hover:opacity-100'
                  }`}>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-primary/70 uppercase mb-1">{soc.id.split('-')[0]}</span>
                       <span className="text-sm font-black dark:text-slate-200">{soc.name}</span>
                    </div>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm rounded-lg"
                      checked={selectedSocieties.includes(soc.id)}
                      onChange={() => handleSocietyToggle(soc.id)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Specialized Designation Parameters */}
            {selectedSocieties.length > 0 && (
              <div className="space-y-6 pt-10 border-t border-black/5 dark:border-white/5 animate-fade-in-up">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Sub-Sector Operational Roles</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedSocieties.map((socId) => {
                    const socName = availableSocieties.find(s => s.id === socId)?.name || socId;
                    const existing = societyDesignations.find(sd => sd.society === socId);
                    return (
                      <div key={socId} className="group/field relative p-6 bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl hover:border-primary/30 transition-all shadow-sm">
                        <label className="label-text font-black text-primary text-[9px] uppercase tracking-widest mb-3 block">{socName}</label>
                        <select
                          className="select select-bordered select-sm w-full bg-white dark:bg-slate-800 rounded-xl font-bold"
                          value={existing?.designation || ""}
                          onChange={(e) => updateSocietyDesignation(socId, e.target.value)}
                        >
                          <option value="">Designation</option>
                          {positions.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Connection Linkages */}
            <div className="form-control w-full border-t border-black/5 dark:border-white/5 pt-10 space-y-2">
              <label className="label-text font-black text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] ml-1">Global_Protocol: LinkedIn</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="input input-bordered h-14 bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 rounded-2xl font-bold text-blue-500 focus:ring-2 focus:ring-blue-400/20"
                {...register("linkedin")}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-10">
            <button
              type="button"
              className="w-full md:w-auto px-10 py-4 font-black uppercase text-xs tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => router.back()}
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className={`w-full md:w-auto btn btn-primary h-auto py-5 px-16 rounded-[2rem] shadow-2xl shadow-primary/30 font-black uppercase text-xs tracking-[0.3em] ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              Synchronize Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfileForm;
