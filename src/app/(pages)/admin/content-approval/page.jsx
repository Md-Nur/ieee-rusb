"use client";
import Title from "@/components/Title";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContentApproval = () => {
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/contents?approved=false")
      .then((res) => setContents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleApproved = async (e, id) => {
    try {
      if (e.target.checked) {
        await axios.post(`/api/content/content-approval`, {
          id,
          isApproved: true,
        });
      } else {
        await axios.post(`/api/content/content-approval`, {
          id,
          isApproved: false,
        });
      }
    } catch (error) {
      e.target.checked = !e.target.checked;
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  return (
    <div className="w-full">
      <Title>Content Approval</Title>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Approved</th>
              <th>Visit</th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Type</th>
              <th>Tags</th>
              <th>Registration Link</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              contents?.length ? (
                contents.map((content) => (
                  <tr className="hover" key={content._id}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-accent"
                          onChange={(e) => handleApproved(e, content._id)}
                        />
                      </label>
                    </th>
                    <td>
                      <Link
                        className="btn btn-sm btn-accent"
                        href={`/content/${content.slug}`}
                      >
                        Visit
                      </Link>
                    </td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            src={content?.thumbnail || "/logo.png"}
                            width={50}
                            height={50}
                            alt={content?.title || "Title"}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link
                        className="hover:underline"
                        href={`/content/${content.slug}`}
                      >
                        {content?.title}
                      </Link>
                    </td>
                    <td>
                      <div
                        className="tooltip tooltip-accent"
                        data-tip={`${content?.user.name} - ${
                          content?.user?.session || content?.user?.designation
                        } - ${content?.user?.dept}`}
                      >
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <Image
                              src={
                                content?.user?.avatar || "/defaultAvatar.jpg"
                              }
                              width={50}
                              height={50}
                              alt={content?.user?.name || "Author"}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {new Date(content?.date)
                        .toUTCString()
                        .split(" ")
                        .slice(0, 4)
                        .join(" ")}
                    </td>
                    <td className="capitalize">{content?.type}</td>
                    <td>
                      {content?.tags?.length ? (
                        <ul>
                          {content?.tags.map((tag, i) => (
                            <li key={i} className="list-disc">
                              {tag || "N/A"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {content?.regUrl ? (
                        <a
                          className="btn btn-accent btn-sm"
                          href={content?.regUrl}
                          target="_blank"
                        >
                          Registration Link
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-error text-xl font-bold"
                  >
                    There have been no users to approve
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  <span className="loading loading-infinity loading-lg"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentApproval;
