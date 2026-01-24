"use client";
import DeleteContentBtn from "@/components/Btns/DeleteContentBtn";
import { useUserAuth } from "@/context/userAuth";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";

const ContentActions = ({ 
  contentUserId, 
  contentSlug, 
  contentType 
}: { 
  contentUserId: string, 
  contentSlug: string, 
  contentType: string 
}) => {
  const { userAuth } = useUserAuth();

  if (userAuth?._id === contentUserId || userAuth?.isAdmin) {
    return (
      <div className="flex gap-3">
        <Link
          href={`/edit-content/${contentSlug}`}
          className="btn btn-primary btn-outline btn-circle hover:bg-primary hover:text-white"
          title="Edit Post"
        >
          <FaUserEdit />
        </Link>
        <DeleteContentBtn slug={contentSlug} type={contentType} />
      </div>
    );
  }
  return null;
};

export default ContentActions;
