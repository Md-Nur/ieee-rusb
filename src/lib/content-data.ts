import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";
import { unstable_cache } from "next/cache";
import { serializeData } from "./serialize";

// Ensure models are registered
const _ = UserModel;

async function getContentInternal({ 
  query, 
  society, 
  approved = true,
  limit
}: { 
  query?: string, 
  society?: string, 
  approved?: boolean,
  limit?: number
} = {}) {
  await dbConnect();
  
  let pipeline: any[] = [{ $sort: { date: -1 } }];

  if (approved !== undefined) {
    pipeline.push({ $match: { isApproved: approved } });
  }

  if (society) {
    pipeline.push({ $match: { society: society } });
  }

  if (query === "blog") {
    pipeline.push({ $match: { type: "blog" } });
  } else if (query && query !== "all") {
    pipeline.push({ $match: { type: "event" } });
  }

  const today = new Date();
  const datePipe = {
    $addFields: {
      parsedDate: {
        $dateFromString: {
          dateString: "$date",
          format: "%Y-%m-%d",
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
    ];
  }

  if (query === "upcoming-event") {
    pipeline.push({ $sort: { date: 1 } });
  }

  if (limit) {
    pipeline.push({ $limit: limit });
  }

  pipeline.push(
    {
      $addFields: {
        userId: { $toObjectId: "$userId" },
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
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true
      },
    },
    {
      $project: {
        "user.password": 0,
      },
    }
  );

  const contents = await ContentModel.aggregate(pipeline);
  return serializeData(contents);
}

export const getContent = (params: any = {}) => {
  return unstable_cache(
    async () => getContentInternal(params),
    [`content-${JSON.stringify(params)}`],
    { revalidate: 3600, tags: ["content"] }
  )();
};

export const getUpcomingEvent = unstable_cache(
  async () => {
    const events = await getContentInternal({ query: "upcoming-event", limit: 1 });
    return events[0] || null;
  },
  ["upcoming-event"],
  { revalidate: 3600, tags: ["content", "upcoming-event"] }
);

export const getRecentEvents = (limit = 3, society?: string) => unstable_cache(
  async () => getContentInternal({ query: "recent-events", limit, society }),
  [`recent-events-${limit}-${society}`],
  { revalidate: 3600, tags: ["content", "recent-events"] }
)();
