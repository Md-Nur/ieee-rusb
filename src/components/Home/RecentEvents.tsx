"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ShowContents from "../ShowContents";
import Title from "../Title";
import Loading from "../Loading";

const RecentEvents = ({ 
  society, 
  title = "Recent Events",
  events = []
}: { 
  society?: string; 
  title?: string;
  events?: any[];
}) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="w-full">
      <Title>{title}</Title>
      {/* @ts-ignore */}
      <ShowContents query="recent-events" society={society} initialData={events} />
    </div>
  );
};

export default RecentEvents;
