import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();

  const emailUser = await UserModel.findOne({ email: data.email });

  if (emailUser) {
    return Response.json(
      { error: "User already exists with this email" },
      { status: 400 }
    );
  }
  if (data.phone.startsWith("+8801")) {
    data.phone = data.phone.slice(3);
  }
  const phoneUser = await UserModel.findOne({ phone: data.phone });

  if (phoneUser) {
    return Response.json(
      { error: "User already exists with this phone number" },
      { status: 400 }
    );
  }
  return Response.json({ message: "User does not exist" }, { status: 200 });
}
