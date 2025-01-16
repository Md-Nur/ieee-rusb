"use client";
import DeleteContentBtn from "@/components/Btns/DeleteContentBtn";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContentOne = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { loading, userAuth } = useUserAuth();
  const [content, setContent] = useState<any | null>(null);
  const [cloading, setCloading] = useState(true);
  const { slug } = use(params);
  useEffect(() => {
    setCloading(true);
    axios
      .get(`/api/contents/${slug}`)
      .then((res) => {
        setContent(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        setCloading(false);
      });
  }, [params]);

  if (cloading || loading)
    return <span className="loading loading-infinity loading-lg"></span>;
  else if (!content) return <div>Content not found</div>;
  else if (
    !content?.isApproved &&
    userAuth?._id !== content.userId &&
    !userAuth?.isAdmin
  ) {
    toast.error("Content not approved");
    redirect("/");
  }

  return (
    <section className="py-20 px-2">
      <h1 className="text-xl md:text-4xl font-bold text-center my-10">
        {content.title}
      </h1>
      <div className="md:p-5 max-w-7xl mx-auto">
        <figure>
          <Image
            src={content?.thumbnail}
            alt={content.title}
            width={1700}
            height={1000}
            className="object-cover w-full max-h-[calc(100vh-250px)] rounded-lg"
          />
        </figure>
        {content.type == "blog" && (
          <div className="flex rounded-lg p-5 mt-5 bg-base-200 justify-center md:justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Image
                src={content?.user?.avatar || "/defaultAvatar.jpg"}
                alt={content?.user?.name}
                width={100}
                height={100}
                className="rounded-full h-16 w-16 object-cover"
              />
              <div>
                {content.user.name}
                <p>Date: {content.date.split("T")[0]}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center flex-wrap">
              <div className="badge badge-primary">Type: {content.type}</div>
            </div>
            {(userAuth?._id === content.userId || userAuth?.isAdmin) && (
              <div className="flex gap-2">
                <Link
                  href={`/edit-content/${content._id}`}
                  className="btn btn-info"
                >
                  Edit
                </Link>
                <DeleteContentBtn id={content._id} type={content.type} />
              </div>
            )}
          </div>
        )}
        <article
          className="custom-html-content rounded-lg p-5 mt-5 bg-base-200"
          dangerouslySetInnerHTML={{ __html: content.content }}
        ></article>
      </div>
      {content?.regUrl && (
        <div className="flex justify-center">
          <a
            href={content.regUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            Register
          </a>
        </div>
      )}
    </section>
  );
};

export default ContentOne;
