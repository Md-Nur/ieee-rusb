"use client";
export const dynamic = "force-dynamic";
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

const availableSocieties = [
  { id: "robotics-&-automation-society", name: "Robotics & Automation Society" },
  { id: "signal-processing-society", name: "Signal Processing Society" },
  { id: "power-&-energy-society", name: "Power & Energy Society" },
  { id: "computer-society", name: "Computer Society" },
  { id: "antenna-&-propagation-society", name: "Antenna & Propagation Society" },
  { id: "women-in-engineering-society", name: "Women In Engineering" },
];

const EditProfile = () => {
  const router = useRouter();
  const { userAuth, setUserAuth } = useUserAuth();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>([]);
  const [societyDesignations, setSocietyDesignations] = useState<{ society: string; designation: string }[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      linkedin: "",
      position: "",
      ieee_id: "",
    },
  });

  useEffect(() => {
    if (userAuth) {
      reset({
        name: userAuth.name || "",
        phone: userAuth.phone || "",
        linkedin: userAuth.linkedin || "",
        position: userAuth.position || "",
        ieee_id: userAuth.ieee_id || "",
      });
      if (userAuth.avatar) {
        setPreview(userAuth.avatar);
      }
      setSelectedSocieties(userAuth.societies || []);
      setSocietyDesignations(userAuth.society_designations || []);
    }
  }, [userAuth, reset]);

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
    <section className="w-full max-w-2xl mx-auto p-5 pb-24">
      <Title>Edit Profile</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
        <div className="flex flex-col items-center gap-4 border-b pb-6">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-200">
              <Image
                src={preview || "/defaultAvatar.jpg"}
                alt="Avatar Preview"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>
          <label
            htmlFor="avatar-upload"
            className="btn btn-sm btn-outline btn-accent gap-2"
          >
            <FaUpload /> Change Avatar
            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label text-xl font-bold">
              <span>Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              {...register("name", { required: "Name is required" })}
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-xl font-bold">
              <span>Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="+1234567890"
              className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
              {...register("phone", { 
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Invalid phone number format"
                }
              })}
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label text-xl font-bold">
            <span>IEEE Membership ID</span>
          </label>
          <input
            type="text"
            placeholder="9xxxxxxx"
            className={`input input-bordered w-full ${errors.ieee_id ? 'input-error' : ''}`}
            {...register("ieee_id", { required: "IEEE ID is required" })}
          />
        </div>

        <div className="form-control w-full">
          <label className="label text-xl font-bold">
            <span>Main Branch Position</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("position", { required: "Position is required" })}
          >
            <option value="">Select Position</option>
            {positions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-xl font-bold">Societies & AGs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableSocieties.map((soc) => (
              <label key={soc.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selectedSocieties.includes(soc.id)}
                  onChange={() => handleSocietyToggle(soc.id)}
                />
                <span className="font-medium">{soc.name}</span>
              </label>
            ))}
          </div>
        </div>

        {selectedSocieties.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-xl font-bold">Society Designations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSocieties.map((socId) => {
                const socName = availableSocieties.find(s => s.id === socId)?.name || socId;
                const existing = societyDesignations.find(sd => sd.society === socId);
                return (
                  <div key={socId} className="card bg-base-300 p-4 shadow-sm">
                    <label className="label p-0 mb-2">
                       <span className="label-text font-bold text-primary">{socName}</span>
                    </label>
                    <select
                      className="select select-bordered select-sm w-full"
                      value={existing?.designation || ""}
                      onChange={(e) => updateSocietyDesignation(socId, e.target.value)}
                    >
                      <option value="">Select Designation</option>
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

        <div className="form-control w-full border-t pt-4">
          <label className="label text-xl font-bold">
            <span>LinkedIn URL</span>
          </label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/username"
            className="input input-bordered w-full text-blue-500"
            {...register("linkedin")}
          />
        </div>

        <div className="flex justify-end gap-3 pt-5 pb-10">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
