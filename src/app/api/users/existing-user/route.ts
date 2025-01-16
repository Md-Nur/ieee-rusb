import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function POST(req: Request) {
  await dbConnect();
  const { email, phone } = await req.json();
  const emailUser = await UserModel.findOne({ email });
  const phoneUser = await UserModel.findOne({ phone });

  if (emailUser) {
    return Response.json(
      { error: "User already exists with this email" },
      { status: 400 }
    );
  }
  if (phoneUser) {
    return Response.json(
      { error: "User already exists with this phone number" },
      { status: 400 }
    );
  }
  return Response.json({ message: "User does not exist" }, { status: 200 });
}