import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET(req: Request) {
  dbConnect();
  const url = new URL(req.url);
  const approved = url.searchParams.get("approved");
  const pipleline = [];
  if (approved) {
    pipleline.push({ $match: { isApproved: approved === "true" } });
  }

  pipleline.push({ $sort: { _id: -1 as 1 | -1 } });

  const users = await UserModel.aggregate(pipleline);
  return Response.json(users, { status: 200 });
}
