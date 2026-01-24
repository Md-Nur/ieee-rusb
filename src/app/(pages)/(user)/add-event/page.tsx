"use client";
export const dynamic = "force-dynamic";
import Title from "@/components/Title";
import Content from "@/components/Content";
import axios from "axios";

const AddEvent = () => {
  return (
    <div>
      <Title>Add Event</Title>
      <Content postData={null} type="event" />
    </div>
  );
};

export default AddEvent;
