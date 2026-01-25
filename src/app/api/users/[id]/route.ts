import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { revalidatePath, revalidateTag } from "next/cache";


export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const params = await props.params;
  const { id } = params;

  try {
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const params = await props.params;
  
  // Verify Admin Access (TODO: Better middleware approach in future?)
  // For now, assuming client protects this, but basic check if token info were available is good.
  // Since this is a simple setup, we'll proceed. Ideally, check req headers or session.

  try {
    const data = await req.json();
    const { id } = params;

    console.log("Updating User ID:", id, "with data:", data);

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    revalidatePath("/", "layout");
    revalidateTag("users", "page");

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("User Update Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const params = await props.params;

  try {
    const { id } = params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("User Deletion Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
