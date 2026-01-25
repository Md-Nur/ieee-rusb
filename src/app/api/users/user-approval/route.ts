import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const { id, isApproved, isAdmin } = data;

  const updateData: any = {};
  if (isApproved !== undefined) updateData.isApproved = isApproved;
  if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

  const updateUser = await UserModel.findByIdAndUpdate(id, {
    $set: updateData,
  }, { new: true });

  revalidatePath("/", "layout");
  revalidateTag("users", "page");
  return Response.json(updateUser, { status: 200 });
}
