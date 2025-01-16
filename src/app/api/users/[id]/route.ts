import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET({ params: { id } }: { params: { id: string } }) {
  await dbConnect();
  const user = await UserModel.findById(id);
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }
  return Response.json({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    phone: user.phone,
    dept: user.dept,
  });
}
