"use client";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { Photos } from "@/models/photos.model";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HomeStats = () => {
  const [images, setImages] = useState<Photos[]>([]);
  useEffect(() => {
    axios
      .get("/api/img")
      .then((res) => {
        setImages(res.data);
        console.log(res.data[0].img);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Something went wrong");
      });
  }, []);
  return (
    <section className="w-full my-10">
      <Title>Photos</Title>
      <div className="flex gap-3 flex-wrap justify-center items-center w-full">
        {images.length ? (
          images.map((image, i) => (
            <div className="card w-72 md:w-96 shadow-xl bg-base-300" key={i}>
              <figure>
                <Image
                  width={400}
                  height={400}
                  src={image.img}
                  alt={image.title}
                  className="sm:max-h-96 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{image.title}</h2>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline badge-accent">
                    {new Date(image.date)
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
          <Loading />
        )}
      </div>
    </section>
  );
};

export default HomeStats;
