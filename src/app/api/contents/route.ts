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
  const query = url.searchParams.get("query");

  let pipeline: any[] = [{ $sort: { date: -1 } }];

  if (approved) {
    pipeline.push({ $match: { isApproved: approved === "true" } });
  }
  if (query === "blog") {
    pipeline.push({ $match: { type: "blog" } });
  } else if (query !== "all") {
    pipeline.push({ $match: { type: "event" } });
  }

  const today = new Date();
  const datePipe = {
    $addFields: {
      parsedDate: {
        $dateFromString: {
          dateString: "$date",
          format: "%Y-%m-%d", // Matches the stored format
        },
      },
    },
  };
  if (query === "upcomming-events" || query === "upcomming-event") {
    pipeline = [
      ...pipeline,
      datePipe,
      {
        $match: {
          parsedDate: { $gte: today },
        },
      },
    ];
  }
  if (query === "recent-events") {
    pipeline = [
      ...pipeline,
      datePipe,
      {
        $match: {
          parsedDate: { $lte: today },
        },
      },
    ];
  }
  pipeline = [
    ...pipeline,
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
  ];

  if (query === "upcomming-event") {
    pipeline.push({ $limit: 1 });
  }

  const contents = await ContentModel.aggregate(pipeline);

  if (!contents.length) {
    return Response.json(
      { error: "There have no content left" },
      { status: 404 }
    );
  }
  return Response.json(contents, { status: 200 });
}
