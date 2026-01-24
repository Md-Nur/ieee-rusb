import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import dbConnect from "./dbConnect";
import UserModel from "@/models/user.model";

export async function getUserFromCookie() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;

    if (!token) return null;

    const decoded: any = verify(
      token,
      process.env.JWT_SECRET || ""
    );

    if (!decoded || !decoded.id) return null;

    await dbConnect();
    const user = await UserModel.findById(decoded.id)
      .select("-password")
      .lean();

    if (!user) return null;

    // Serialize _id and other ObjectId fields
    return {
      ...user,
      _id: user._id.toString(),
    };
  } catch (error) {
    console.error("Auth Error:", error);
    return null;
  }
}
