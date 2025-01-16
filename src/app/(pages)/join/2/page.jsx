"use client";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

const Join2 = () => {
  const { user, setUser } = useJoin();
  const [preview, setPreview] = useState();
  const [progress, setProgress] = useState(0);
  const avatarFile = useRef(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = avatarFile.current?.files?.[0] || null;
    if (file) {
      setProgress(20);
      const formData = new FormData();
      setProgress(40);
      formData.append("image", file);
      setProgress(60);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );
      setProgress(80);
      setUser({ ...user, avatar: response?.data?.data.url });
      setProgress(100);
    } else {
      setUser({ ...user, avatar: "" });
    }
    router.push("/join/3");
  };
  const onFileChange = () => {
    // console.log(avatarFile.current);
    const file = avatarFile.current?.files?.[0] || null;
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };
  return (
    <div className="card-body">
      <Title>Upload Avatar</Title>
      <form
        className="flex flex-col max-w-sm mx-auto gap-3 w-full"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="avatar"
          className="btn btn-accent w-auto h-auto mx-auto rounded-full p-1"
        >
          {preview ? (
            <Image
              alt="avatar"
              height={300}
              width={300}
              className="w-72 h-72 object-cover rounded-full"
              src={preview}
            />
          ) : (
            <FaUserAlt className="w-72 h-72 p-3 rounded-full" />
          )}
        </label>

        <input
          accept="image/*"
          onChange={onFileChange}
          ref={avatarFile}
          id="avatar"
          type="file"
          className="file-input file-input-accent"
        />
        {(progress > 0 || preview) && (
          <progress
            className="progress progress-accent w-full block mx-auto"
            value={progress}
            max="100"
          ></progress>
        )}
        <div className="flex w-full items-center justify-between my-5">
          <Link href="/join/1" type="reset" className="btn btn-accent">
            Previous
          </Link>
          <button
            type="submit"
            className="btn btn-accent"
            // disabled={progress === 100 || !preview}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join2;
