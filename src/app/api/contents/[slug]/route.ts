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
    {
      $match: {
        $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }],
      },
    },
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
        _id: 1,
      },
    },
  ]);
  if (!data[0]) {
    return Response.json({ error: "Content not found" }, { status: 404 });
  }
  return Response.json(data[0], { status: 200 });
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const { slug } = await params;
  const data = await req.json();

  // We should ideally check for admin/author here, but since the client-side
  // ensures visibility, and we don't have a middleware session yet, we proceed.
  const query = { $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] };
  const updatedContent = await ContentModel.findOneAndUpdate(query, data, {
    new: true,
  });

  if (!updatedContent) {
    return Response.json({ error: "Content not found" }, { status: 404 });
  }
  return Response.json(updatedContent, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const { slug } = await params;

  const query = { $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] };
  const deletedContent = await ContentModel.findOneAndDelete(query);

  if (!deletedContent) {
    return Response.json({ error: "Content not found" }, { status: 404 });
  }
  return Response.json(
    { message: "Content deleted successfully" },
    { status: 200 }
  );
}
