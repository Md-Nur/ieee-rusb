import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function getUser() {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;

    if (!token) {
      return null;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || !decoded.id) {
      return null;
    }

    const user = await UserModel.findById(decoded.id).lean();

    if (!user) {
      return null;
    }

    // Convert to plain object and remove sensitive data if needed (though lean() does most of it)
    // Serialization for Client Components requires plain objects (no Date objects, etc if not handled)
    // Mongoose documents are not directly serializable, but lean() helps.
    // We need to ensure _id and other ObjectIds are strings.
    
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
