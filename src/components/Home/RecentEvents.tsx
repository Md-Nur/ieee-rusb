"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ShowContents from "../ShowContents";
import Title from "../Title";
import Loading from "../Loading";

const RecentEvents = ({ society, title = "Recent Events" }: { society?: string; title?: string }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = `/api/contents?query=recent-events&approved=true`;
    if (society) {
      url += `&society=${society}`;
    }
    axios
      .get(url)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [society]);

  if (loading) return <Loading />;
  if (events.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto">
      <Title>{title}</Title>
      {/* @ts-ignore */}
      <ShowContents query="recent-events" society={society} initialData={events} />
    </div>
  );
};

export default RecentEvents;
