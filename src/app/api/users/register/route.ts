import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  if (
    !data?.email ||
    !data?.password ||
    !data?.phone ||
    !data?.name ||
    !data?.dept
  ) {
    return Response.json({ error: "All fields are required" }, { status: 404 });
  }

  const existingUser = await UserModel.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (existingUser) {
    return Response.json(
      { error: "User already exists with this phone number or email" },
      { status: 400 }
    );
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
    { message: "Registration successful! Plase login after approval" },
    { status: 201 }
  );
}
