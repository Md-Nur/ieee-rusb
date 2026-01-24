import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const updateUser = await UserModel.findByIdAndUpdate(data.id, {
    isApproved: data.isApproved,
  });

  revalidatePath("/", "layout");
  revalidateTag("users", "page");
  return Response.json(updateUser, { status: 200 });
}
