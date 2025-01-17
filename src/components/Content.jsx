"use client";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
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
      tags: postData?.tags.join(",") || "",
      content: postData?.content || "",
      userId: postData?.userId || userAuth?._id,
      regUrl: postData?.regUrl || "",
      date: postData?.date || new Date().toISOString().split("T")[0],
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
    toast.loading("Please wait...");
    if (!image && !postData?.thumbnail) {
      toast.dismiss();
      toast.error("Thumbnail is required");
      return;
    }
    if (!editorRef.current.getContent()) {
      toast.dismiss();
      toast.error("Content are required");
      return;
    } else {
      console.log(editorRef.current.getContent());
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
        toast.dismiss();
        toast.error(error?.response?.data?.error || error.message);
        return;
      }
    }

    try {
      let res;
      if (postData) {
        res = await axios.put(`/api/contents/${postData._id}`, data);
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
      toast.dismiss();
      setProgress(100);
      router.push(`/content/${res.data.slug}`);
      toast.success("Success!");
    } catch (error) {
      toast.dismiss();
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
          toast.error(error?.response?.data?.error || error.message);
        });
    } else {
      setAuthor(userAuth);
    }
  }, [userAuth, postData]);

  return (
    <section className="card">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body p-1 md:p-5 m-1 md:m-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered input-accent w-full"
            required
            {...register("title", { required: true })}
          />
        </div>
        {type === "event" && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered input-accent w-full"
              required
              {...register("date", { required: true })}
            />
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Thumbnail</span>
          </label>
          {(preview || postData?.thumbnail) && (
            <Image
              height={300}
              width={500}
              src={preview || postData?.thumbnail}
              alt="Image Preview"
              className="mx-auto max-h-96 object-cover rounded-md my-3 w-full"
            />
          )}

          <label
            htmlFor="imgFile"
            className="flex flex-row items-center gap-2 px-1 justify-center bg-accent py-2 rounded-md cursor-pointer"
          >
            <FaUpload className="text-3xl text-accent-content" />
            <input
              id="imgFile"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              // required={!postData?.thumbnail}
            />

            <span className="uppercase text-accent-content">Thumbnail</span>
          </label>
        </div>
        <div className="flex w-full items-center gap-5">
          {type === "blog" && (
            <div className="flex flex-col items-center w-16 gap-2">
              <p className="">Author</p>
              <Image
                src={author?.avatar || "/defaultAvatar.jpg"}
                alt={author?.name}
                width={50}
                height={50}
                className="rounded-full h-12 w-12 object-cover"
              />
            </div>
          )}
          <div
            className={`form-control ${
              type === "blog" ? "w-[calc(100%-5rem)]" : "w-full"
            }`}
          >
            <label className="label">
              <span className="label-text">Tags (coma sparated)</span>
            </label>
            <input
              type="text"
              placeholder="Tags (coma separated)"
              className="input input-bordered"
              {...register("tags")}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
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
        {type === "event" && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Regristration Link</span>
            </label>
            <input
              type="url"
              placeholder="Registration Link"
              className="input input-bordered input-accent"
              {...register("regUrl")}
            />
          </div>
        )}
        {progress > 0 && (
          <progress
            className="progress progress-accent w-full my-5"
            value={progress}
            max="100"
          ></progress>
        )}
        <div className="form-control my-5">
          <button className="btn btn-accent capitalize">
            {postData ? "Update" : `Add ${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Content;
