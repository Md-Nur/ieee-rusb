import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const { slug } = await params;
  const data = await ContentModel.aggregate([
    {
      $addFields: {
        userId: { $toObjectId: "$userId" },
        id: { $toString: "$_id" },
      },
    },
    { $match: { slug } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        "user.password": 0,
        id: 0,
      },
    },
  ]);
  if (!data[0]) {
    return Response.json({ error: "Content not found" }, { status: 404 });
  }
  return Response.json(data[0], { status: 200 });
}
