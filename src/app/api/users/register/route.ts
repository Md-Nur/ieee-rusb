import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  if (
    !data?.name ||
    !data?.email ||
    !data?.phone ||
    !data?.password ||
    !data?.dept ||
    !data?.position
  ) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  // Removed Bangladesh-specific phone normalization to support international numbers

  const existingEmail = await UserModel.findOne({ email: data.email });
  if (existingEmail) {
    return Response.json(
      { error: "User already exists with this email" },
      { status: 400 }
    );
  }

  const existingPhone = await UserModel.findOne({ phone: data.phone });
  if (existingPhone) {
    return Response.json(
      { error: "User already exists with this phone number" },
      { status: 400 }
    );
  }

  if (data.ieee_id) {
    const existingIEEE = await UserModel.findOne({ ieee_id: data.ieee_id });
    if (existingIEEE) {
      return Response.json(
        { error: "User already exists with this IEEE ID" },
        { status: 400 }
      );
    }
  } else {
    delete data.ieee_id;
  }

  if (
    data.roles.includes("faculty-member") &&
    data.roles.includes("student-member")
  ) {
    return Response.json(
      { error: "You can't be both faculty and student member" },
      { status: 400 }
    );
  }
  if (
    data.roles.includes("student-member") &&
    (data.roles.includes("gradute-member") || data.roles.includes("alumni"))
  ) {
    return Response.json(
      { error: "You can't be both student and gradute member/alumni" },
      { status: 400 }
    );
  }

  data.password = await hash(data.password, 12);

  const newUser = await UserModel.create(data);
  if (!newUser) {
    return Response.json({ error: "Can't create this user" }, { status: 500 });
  }
  return Response.json(
    { message: "Registration successful! Please login after approval" },
    { status: 201 }
  );
}
