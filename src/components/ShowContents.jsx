"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const ShowContents = ({ query }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/api/contents?query=${query}&approved=true`)
      .then((res) => {
        setContents(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="flex max-w-7xl justify-center gap-5 flex-wrap mx-auto">
      {!loading && contents.length ? (
        contents.map((content) => (
          <div
            key={content._id}
            className="card bg-accent text-accent-content w-full max-w-96 shadow-xl"
          >
            <figure>
              <Image
                src={content.thumbnail}
                height={400}
                width={400}
                alt={content.title}
                className="object-cover max-h-72"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{content.title}</h2>
              {content.type === "blog" && (
                <div className="flex items-center gap-2">
                  <Image
                    src={content?.user?.avatar || "/defaultAvatar.jpg"}
                    alt={content?.user?.name}
                    width={100}
                    height={100}
                    className="rounded-full h-16 w-16 object-cover"
                  />
                  <div>
                    <p>Author: {content.user.name}</p>
                    <p>Department: {content.user.dept}</p>
                    <p>
                      {content.user?.session ? "Session" : "Designation"}:{" "}
                      {content.user?.session || content.user?.designation}
                    </p>
                  </div>
                </div>
              )}
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  {new Date(content?.date)
                    .toUTCString()
                    .split(" ")
                    .slice(0, 4)
                    .join(" ")}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span className="loading loading-infinity loading-lg"></span>
      )}
    </div>
  );
};

export default ShowContents;
