"use client";
import { useEffect, useRef, useState } from "react";
import { FaUpload, FaChevronDown, FaPenNib, FaDatabase, FaLayerGroup, FaLink } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Content = ({ postData, type }) => {
  const router = useRouter();
  const { userAuth } = useUserAuth();
  const editorRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [author, setAuthor] = useState(userAuth);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: postData?.title || "",
      type: postData?.type || "",
      tags: postData?.tags?.join(",") || "",
      content: postData?.content || "",
      userId: postData?.userId || userAuth?._id,
      regUrl: postData?.regUrl || "",
      date: postData?.date || new Date().toISOString().split("T")[0],
      society: postData?.society || "",
    },
  });

  const handleFileChange = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    setProgress(5);
    const toastId = toast.loading("Processing Transmission...");
    if (!image && !postData?.thumbnail) {
      toast.dismiss(toastId);
      toast.error("Thumbnail registration failed: Field required.");
      return;
    }
    if (!editorRef.current.getContent()) {
      toast.dismiss(toastId);
      toast.error("Content integrity error: Empty payload.");
      return;
    }
    data.content = editorRef.current.getContent();
    data.tags = data.tags.split(",").map((tag) => tag.trim());
    setProgress(25);
    
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      setProgress(35);
      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          formData
        );
        setProgress(50);
        data.thumbnail = response?.data?.data?.url;
        setProgress(60);
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.error || error.message);
        return;
      }
    }

    try {
      let res;
      if (postData) {
        res = await axios.put(`/api/contents/${postData.slug}`, data);
        setProgress(80);
      } else {
        data.userId = userAuth._id;
        if (!data.date) {
          data.date = new Date().toISOString().split("T")[0];
        }
        data.type = type;
        setProgress(75);
        res = await axios.post("/api/contents", data);
        setProgress(90);
      }
      toast.dismiss(toastId);
      setProgress(100);
      toast.success("Sync complete! entry updated.");
      router.push(`/content/${res.data.slug}`);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (postData) {
      axios
        .get(`/api/users/${postData.userId}`)
        .then((res) => {
          setAuthor(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setAuthor(userAuth);
    }
  }, [userAuth, postData]);

  return (
    <section className="relative">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 md:p-12 space-y-10"
        >
          {/* Section 1: Core Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="form-control">
                <label className="flex items-center gap-2 mb-3 px-1">
                  <FaPenNib className="text-primary text-xs" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Entry_Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter content title..."
                  className="input input-lg bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl w-full font-display font-bold text-xl transition-all"
                  required
                  {...register("title", { required: true })}
                />
              </div>

              {type === "event" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="flex items-center gap-2 mb-3 px-1">
                       <FaDatabase className="text-primary text-xs" />
                       <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Event_Date</span>
                    </label>
                    <input
                      type="date"
                      className="input bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:border-primary rounded-2xl w-full font-mono font-bold"
                      required
                      {...register("date", { required: true })}
                    />
                  </div>
                  <div className="form-control">
                    <label className="flex items-center gap-2 mb-3 px-1">
                       <FaLayerGroup className="text-primary text-xs" />
                       <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Branch_Affiliation</span>
                    </label>
                    <div className="relative">
                      <select
                        className="select bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:border-primary rounded-2xl w-full font-semibold appearance-none"
                        {...register("society")}
                      >
                        <option value="">General (All Events)</option>
                        <option value="computer-society">Computer Society</option>
                        <option value="power-&-energy-society">Power & Energy Society</option>
                        <option value="robotics-&-automation-society">Robotics & Automation Society</option>
                        <option value="signal-processing-society">Signal Processing Society</option>
                        <option value="women-in-engineering-society">Women In Engineering</option>
                        <option value="antenna-&-propagation-society">Antenna & Propagation Society</option>
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs" />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-control">
                <label className="flex items-center gap-2 mb-3 px-1">
                  <FaLayerGroup className="text-primary text-xs" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Search_Indexing_Tags</span>
                </label>
                <input
                  type="text"
                  placeholder="technology, innovation, research..."
                  className="input bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:border-primary rounded-2xl w-full"
                  {...register("tags")}
                />
              </div>
            </div>

            {/* Section 2: Visual Interface */}
            <div className="space-y-6">
               <label className="flex items-center gap-2 mb-3 px-1">
                  <FaUpload className="text-primary text-xs" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Visual_Asset_Preview</span>
               </label>
               
               <div className="relative group/upload h-[280px] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700/50 transition-all hover:border-primary hover:bg-primary/5">
                 {(preview || postData?.thumbnail) ? (
                   <>
                     <Image
                       src={preview || postData?.thumbnail}
                       alt="Thumbnail Preview"
                       fill
                       className="object-cover"
                     />
                     <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <label htmlFor="imgFile" className="btn btn-primary rounded-full px-8 cursor-pointer">Re-upload Asset</label>
                     </div>
                   </>
                 ) : (
                   <label htmlFor="imgFile" className="absolute inset-0 flex flex-col items-center justify-center space-y-4 cursor-pointer">
                      <div className="p-6 bg-white dark:bg-slate-700 rounded-3xl shadow-xl transform transition-transform group-hover/upload:scale-110">
                         <FaUpload className="text-3xl text-primary" />
                      </div>
                      <div className="text-center">
                         <p className="font-bold text-slate-600 dark:text-slate-300">Upload Component Thumbnail</p>
                         <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">384 X 288 recommended</p>
                      </div>
                   </label>
                 )}
                 <input
                   id="imgFile"
                   type="file"
                   className="hidden"
                   accept="image/*"
                   onChange={handleFileChange}
                 />
               </div>
            </div>
          </div>

          {/* Section 3: Rich Content Interface */}
          <div className="form-control space-y-4 border-t border-black/5 dark:border-white/5 pt-12">
            <label className="flex items-center gap-2 mb-2 px-1">
              <FaPenNib className="text-primary text-xs" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Body_Payload</span>
            </label>
            <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                initialValue={postData?.content || ""}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 500,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px  }",
                }}
              />
            </div>
          </div>

          {type === "event" && (
            <div className="form-control space-y-4">
              <label className="flex items-center gap-2 px-1">
                <FaLink className="text-primary text-xs" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">External_Gateway_URL</span>
              </label>
              <input
                type="url"
                placeholder="https://registration.ieee.org/..."
                className="input input-lg bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 focus:border-primary rounded-2xl w-full transition-all"
                {...register("regUrl")}
              />
            </div>
          )}

          {/* Section 4: Process Status & Action */}
          <div className="pt-10 border-t border-black/5 dark:border-white/5">
            {progress > 0 && (
              <div className="mb-8 space-y-3">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">Syncing_In_Progress</span>
                    <span className="text-xs font-mono font-bold text-primary">{progress}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-primary bg-gradient-to-r from-primary via-accent to-primary animate-text-shimmer transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                 </div>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl overflow-hidden ring-4 ring-primary/5 bg-slate-100">
                    <Image
                      src={author?.avatar || "/defaultAvatar.jpg"}
                      alt={author?.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Authenticated_Admin</h4>
                    <p className="font-bold text-slate-700 dark:text-slate-300 font-display">{author?.name}</p>
                 </div>
               </div>

               <button className="btn btn-primary btn-lg rounded-full px-12 group transition-all hover:shadow-[0_0_30px_rgba(var(--p),0.3)] min-w-[240px]">
                 <span className="relative z-10 font-black tracking-[0.2em] uppercase text-xs">
                    {postData ? "Update Transmission" : `Deploy ${type}`}
                 </span>
                 <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
               </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Content;
