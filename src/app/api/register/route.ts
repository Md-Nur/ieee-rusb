import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();

  if (!data.email || !data.password || !data.confirmPassword) {
    return Response.json({ message: "All fields are required" });
  }
  if (data.password !== data.confirmPassword) {
    return Response.json({ message: "Password do not match" });
  } else {
    delete data.confirmPassword;
  }

  const newUser = await UserModel.create(data);
  if (!newUser) {
    return Response.json({ message: "Something went wrong" });
  }
  return Response.json({ message: "User created successfully" });
}
