"use client";
import { Content } from "@/models/content.model";
import Title from "../Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Image from "next/image";
import Link from "next/link";

const UpcomingEvent = () => {
  const [upcomingEvent, setUpcomingEvent] = useState<Content | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("/api/contents?approved=true&query=upcomming-event")
      .then((res) => {
        setUpcomingEvent(res.data[0]);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  } else if (!upcomingEvent) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4">
      <Title>Upcoming Event</Title>
      <Link
        href={`/content/${upcomingEvent.slug}`}
        className="card bg-base-200 w-full shadow-xl"
      >
        <figure>
          <Image
            src={upcomingEvent.thumbnail}
            alt={upcomingEvent.title}
            width={1300}
            height={1300}
            className="max-h-96 object-cover"
          />
        </figure>
        <div className="card-body w-full">
          <h2 className="card-title text-2xl md:text-3xl text-center block capitalize">
            {upcomingEvent.title}
          </h2>
        </div>
      </Link>
      <Link
        href={`/content/${upcomingEvent.slug}`}
        className="btn btn-accent mx-auto"
      >
        Read More
      </Link>
    </div>
  );
};

export default UpcomingEvent;
