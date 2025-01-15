import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const updateUser = await UserModel.findByIdAndUpdate(data.id, {
    isApproved: data.isApproved,
  });
  return Response.json(updateUser, { status: 200 });
}
