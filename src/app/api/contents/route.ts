import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";

const existingSlug = async (title: string) => {
  await dbConnect();
  const slug = title.toLowerCase().replace(/ /g, "-");
  const exitData = await ContentModel.findOne({ slug });
  if (exitData) {
    existingSlug(slug + "-1");
  } else {
    return slug;
  }
};

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  if (
    !data.title ||
    !data.content ||
    !data.type ||
    !data.date ||
    !data.thumbnail ||
    !data.userId
  ) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }
  data.slug = await existingSlug(data.title);
  console.log(data);
  const content = await ContentModel.create(data);
  if (!content) {
    return Response.json({ error: "content didn't added" }, { status: 400 });
  }
  return Response.json(content);
}

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const approved = url.searchParams.get("approved");
  const pipleline = [];
  if (approved) {
    pipleline.push({ $match: { isApproved: approved === "true" } });
  }
  pipleline.push({ $sort: { date: -1 as 1 | -1 } });

  const contents = await ContentModel.aggregate([
    ...pipleline,
    {
      $addFields: {
        userId: { $toObjectId: "$userId" },
        id: { $toString: "$_id" },
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
      },
    },
  ]);

  if (!contents.length) {
    return Response.json(
      { error: "There have no content left" },
      { status: 404 }
    );
  }
  return Response.json(contents, { status: 200 });
}
