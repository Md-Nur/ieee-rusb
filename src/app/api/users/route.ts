import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET(req: Request) {
  dbConnect();
  const url = new URL(req.url);
  const approved = url.searchParams.get("approved");
  const position = url.searchParams.get("position");
  let query = url.searchParams.get("query");

  if (query) {
    query = query?.replace("-and-", "-&-");
  }
  
  const pipleline = [];
  if (approved) {
    pipleline.push({ $match: { isApproved: approved === "true" } });
  }
  if (position) {
    pipleline.push({ $match: { position } });
  }

  pipleline.push({ $sort: { _id: -1 as 1 | -1 } });
  if (
    query === "executive-committee" ||
    query === "faculty-member" ||
    query === "student-member" ||
    query === "graduate-member" ||
    query === "alumni"
  ) {
    pipleline.push({
      $match: {
        roles: {
          $elemMatch: { $eq: query },
        },
      },
    });
  }

  if (
    query === "women-in-engineering-society" ||
    query === "signal-processing-society" ||
    query === "antenna-&-propagation-society" ||
    query === "computer-society" ||
    query === "power-&-energy-society" ||
    query === "robotics-&-automation-society"
  ) {
    pipleline.push({
      $match: {
        societies: {
          $elemMatch: { $eq: query },
        },
      },
    });
  }
  const users = await UserModel.aggregate(pipleline);
  return Response.json(users, { status: 200 });
}
