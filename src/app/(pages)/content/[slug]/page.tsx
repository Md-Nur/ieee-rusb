"use client";
import DeleteContentBtn from "@/components/Btns/DeleteContentBtn";
import Title from "@/components/Title";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "@/app/(pages)/content/style.css";
import Loading from "@/components/Loading";

const ContentOne = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { userAuth } = useUserAuth();
  const [content, setContent] = useState<{
    _id: string;
    title: string;
    content: string;
    date: string;
    type: string;
    thumbnail: string;
    regUrl?: string;
    slug: string;
    userId: string;
    isApproved: boolean;
    user: { name: string; avatar: string };
  } | null>(null);
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
  }, [slug]);

  if (cloading) return <Loading />;
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
    <section className="md:px-2 w-full">
      <Title>{content.title}</Title>
      <div className="md:p-5">
        <figure>
          <Image
            src={content?.thumbnail}
            alt={content.title}
            width={1600}
            height={1200}
            className="object-cover w-full max-h-[1200px] rounded-lg"
          />
        </figure>
        {content.type == "blog" && (
          <div className="flex rounded-lg p-5 my-5 bg-base-200 justify-center md:justify-between items-center flex-wrap gap-3">
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
              <div className="badge badge-primary">{content.type}</div>
            </div>
            {(userAuth?._id === content.userId || userAuth?.isAdmin) && (
              <div className="flex gap-2">
                <Link
                  href={`/edit-content/${content?.slug}`}
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
          className="custom-html-content rounded-lg p-2 md:p-5 my-5 bg-base-200"
          dangerouslySetInnerHTML={{ __html: content.content }}
        ></article>
      </div>
      {content?.regUrl &&
        new Date(content.date) > new Date() && (
        // If the date is in the future, show the register button
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
