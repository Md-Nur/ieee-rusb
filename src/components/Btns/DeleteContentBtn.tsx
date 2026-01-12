"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteContentBtn = ({ slug, type }: { slug: string; type: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      toast.loading(`Deleting ${type}...`);
      try {
        await axios.delete(`/api/contents/${slug}`);
        toast.dismiss();
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
        router.push(type === "blog" ? "/blogs" : "/events");
      } catch (err: any) {
        toast.dismiss();
        toast.error(err?.response?.data?.error || "Failed to delete");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-error">
      Delete
    </button>
  );
};

export default DeleteContentBtn;
