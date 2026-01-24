import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const data = await req.json();

    // Only allow safe fields to be updated by the user themselves
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.phone) updateData.phone = data.phone;
    if (data.linkedin !== undefined) updateData.linkedin = data.linkedin;
    if (data.avatar) updateData.avatar = data.avatar;
    if (data.position) updateData.position = data.position;
    if (data.societies) updateData.societies = data.societies;
    if (data.society_designations) updateData.society_designations = data.society_designations;
    if (data.ieee_id) updateData.ieee_id = data.ieee_id;

    const updatedUser = await UserModel.findByIdAndUpdate(decoded.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    revalidatePath("/", "layout");
    revalidateTag("users", "page");

    // Return the updated user (omitting sensitive fields if necessary, 
    // but findByIdAndUpdate returns the full doc by default)
    const { password, ...safeUser } = updatedUser.toObject();

    return NextResponse.json(safeUser);
  } catch (error: any) {
    console.error("Profile Update Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
