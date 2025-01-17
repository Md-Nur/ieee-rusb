import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await dbConnect();
  const cookieStore = await cookies();
  const data = await req.json();

  if (!data.phoneEmail) {
    return Response.json(
      { error: "Phone or Email is required" },
      { status: 400 }
    );
  }
  if (!data.password) {
    return Response.json({ error: "Password is required" }, { status: 400 });
  }
  if (data.phoneEmail.startsWith("+8801")) {
    data.phoneEmail = data.phoneEmail.slice(3);
  }

  const user = await UserModel.findOne({
    $or: [{ email: data.phoneEmail }, { phone: data.phoneEmail }],
  });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  if (!user.isApproved) {
    return Response.json({ error: "User not approved" }, { status: 400 });
  }

  const isPasswordMatch = await compare(data.password, user.password);
  if (isPasswordMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    cookieStore.set("userToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });
    return Response.json(
      { message: "Logged in successfully", user },
      { status: 200 }
    );
  } else {
    return Response.json({ error: "Password is incorrect" }, { status: 400 });
  }
}
