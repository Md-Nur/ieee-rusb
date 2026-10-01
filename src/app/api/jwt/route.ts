import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET() {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get("userToken")?.value;

    if (!token) {
      return Response.json(null, { status: 200 });
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    let userId: any;
    try {
      userId = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return Response.json(null, { status: 200 });
    }

    if (!userId || !userId.id) {
      return Response.json(null, { status: 200 });
    }

    const newUser = await UserModel.findById(userId.id);
    if (!newUser) {
      return Response.json(null, { status: 200 });
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
    dept: newUser.dept,
    session: newUser.session,
    designation: newUser.designation,
    ieee_id: newUser.ieee_id,
    society_designations: newUser.society_designations,
  });
  } catch (error) {
    console.error("JWT verification error:", error);
    return Response.json(null, { status: 200 });
  }
}
