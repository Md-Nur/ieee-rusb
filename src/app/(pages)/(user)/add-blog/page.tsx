"use client";
export const dynamic = "force-dynamic";
import Content from "@/components/Content";
import Title from "@/components/Title";
import { useForm } from "react-hook-form";

const AddBlog = () => {
  return (
    <div>
      <Title>Add Blog</Title>
      <Content postData={null} type="blog"/>
    </div>
  );
};

export default AddBlog;
