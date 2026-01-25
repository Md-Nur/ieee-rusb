import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import { revalidatePath, revalidateTag } from "next/cache";

const existingSlug = async (title) => {
  await dbConnect();
  const slug = title.toLowerCase().replace(/ /g, "-");
  console.log(slug);
  const existData = await ContentModel.findOne({ slug });
  if (existData) {
    return await existingSlug(slug + "-1");
  } else {
    return slug;
  }
};

export async function POST(req) {
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

  revalidatePath("/", "layout");
  revalidateTag("content", "page");
  return Response.json(content);
}

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const approved = url.searchParams.get("approved");
  const query = url.searchParams.get("query");
  const society = url.searchParams.get("society");

  let pipeline = [{ $sort: { date: -1 } }];

  if (approved) {
    pipeline.push({ $match: { isApproved: approved === "true" } });
  }

  if (society) {
    pipeline.push({ $match: { society: society } });
  }
  if (query === "blog") {
    pipeline.push({ $match: { type: "blog" } });
  } else if (query !== "all") {
    pipeline.push({ $match: { type: "event" } });
  }

  // Dates
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

  if (query === "upcoming-events" || query === "upcoming-event") {
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
      { $limit: 3 },
    ];
  }

  if (query === "upcoming-event") {
    pipeline = [
      ...pipeline,
      {
        $sort: {
          date: 1,
        },
      },
      {
        $limit: 1,
      },
    ];
  }

  const page = parseInt(url.searchParams.get("page")) || null;
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

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

  if (page) {
    const paginatedPipeline = [
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];
    const result = await ContentModel.aggregate([...pipeline, ...paginatedPipeline]);
    const response = {
      data: result[0].data,
      total: result[0].totalCount[0]?.count || 0,
      page,
      limit,
    };
    return Response.json(response, { status: 200 });
  }

  const contents = await ContentModel.aggregate(pipeline);
  return Response.json(contents, { status: 200 });
}
