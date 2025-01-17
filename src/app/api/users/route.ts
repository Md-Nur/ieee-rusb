import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET(req: Request) {
  dbConnect();
  const url = new URL(req.url);
  const approved = url.searchParams.get("approved");
  const position = url.searchParams.get("position");
  const pipleline = [];
  if (approved) {
    pipleline.push({ $match: { isApproved: approved === "true" } });
  }
  if (position) {
    pipleline.push({ $match: { position } });
  }

  pipleline.push({ $sort: { _id: -1 as 1 | -1 } });

  const users = await UserModel.aggregate(pipleline);
  return Response.json(users, { status: 200 });
}
