import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET() {
  await dbConnect();
  const cookieStore = await cookies();
  const token: string | undefined = cookieStore.get("userToken")?.value;
  // console.log(token);
  if (!token) {
    return Response.json({ error: "Did not found token" }, { status: 401 });
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const userId: any = jwt.verify(token, process.env.JWT_SECRET!);
  if (!userId) {
    return Response.json(
      { error: "Unauthorized id didn't found" },
      { status: 401 }
    );
  }
  // console.log(userId);
  const newUser = await UserModel.findById(userId.id);
  if (!newUser) {
    return Response.json({ error: "There have no user" }, { status: 401 });
  }
  // console.log(newUser);
  return Response.json({
    _id: newUser._id,
    name: newUser.name,
    avatar: newUser.avatar,
    email: newUser.email,
    phone: newUser.phone,
    isAdmin: newUser.isAdmin,
    isApproved: newUser.isApproved,
    roles: newUser.roles,
    societies: newUser.societies,
  });
}
