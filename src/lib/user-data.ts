import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { serializeData } from "./serialize";
import { unstable_cache } from "next/cache";

const positions = [
  "Counselor",
  "Advisor",
  "Senior member",
  "Alumni",
  "Chairperson",
  "Vice Chair",
  "General Sec",
  "Ass GS",
  "Treasuerer",
  "Webmaster",
  "Programm coordinator",
  "Graphic Designer",
  "Content Development",
  "Membership Development",
  "Public Relation",
  "Photographer",
  "Publication coordinator",
  "Volunteer",
  "Other",
];

async function getUsersInternal({
  approved,
  query,
  limit,
  page,
}: {
  approved?: boolean;
  query?: string;
  limit?: number;
  page?: number;
}) {
  await dbConnect();

  if (query) {
    query = query?.replace("-and-", "-&-");
  }

  const match: any = {};
  if (approved !== undefined) match.isApproved = approved;

  const pipeline: any[] = [{ $match: match }];

  // Handle Roles
  if (
    query === "executive-committee" ||
    query === "faculty-member" ||
    query === "student-member" ||
    query === "graduate-member" ||
    query === "alumni"
  ) {
    pipeline.push({
      $match: {
        roles: {
          $elemMatch: { $eq: query },
        },
      },
    });
  }

  // Handle Societies
  let isSocietyQuery = false;
  if (
    query === "women-in-engineering-society" ||
    query === "signal-processing-society" ||
    query === "antenna-&-propagation-society" ||
    query === "computer-society" ||
    query === "power-&-energy-society" ||
    query === "robotics-&-automation-society"
  ) {
    isSocietyQuery = true;
    pipeline.push({
      $match: {
        societies: {
          $elemMatch: { $eq: query },
        },
      },
    });
  }

  pipeline.push({
    $addFields: {
      sortingPosition: {
        $cond: {
          if: { $eq: [isSocietyQuery, true] },
          then: {
            $let: {
              vars: {
                techDesignation: {
                  $first: {
                    $filter: {
                      input: { $ifNull: ["$society_designations", []] },
                      as: "sd",
                      cond: { $eq: ["$$sd.society", query] },
                    },
                  },
                },
              },
              in: { $ifNull: ["$$techDesignation.designation", "$position"] },
            },
          },
          else: { $ifNull: ["$position", "Other"] },
        },
      },
    },
  });

  pipeline.push({
    $addFields: {
      normalizedPosition: {
        $switch: {
          branches: [
            {
              case: {
                $in: ["$sortingPosition", ["Vice Chairperson", "Vice Chair"]],
              },
              then: "Vice Chair",
            },
            {
              case: {
                $in: ["$sortingPosition", ["General Secretary", "General Sec"]],
              },
              then: "General Sec",
            },
            {
              case: {
                $in: [
                  "$sortingPosition",
                  ["Assistant General Secretary", "Ass GS"],
                ],
              },
              then: "Ass GS",
            },
            {
              case: {
                $in: ["$sortingPosition", ["Treasurer", "Treasuerer"]],
              },
              then: "Treasuerer",
            },
            {
              case: {
                $in: [
                  "$sortingPosition",
                  ["Program Coordinator", "Programm coordinator"],
                ],
              },
              then: "Programm coordinator",
            },
            {
              case: {
                $in: [
                  "$sortingPosition",
                  ["Content Development Coordinator", "Content Development"],
                ],
              },
              then: "Content Development",
            },
            {
              case: {
                $in: [
                  "$sortingPosition",
                  ["Member Development Coordinator", "Membership Development"],
                ],
              },
              then: "Membership Development",
            },
            {
              case: {
                $in: [
                  "$sortingPosition",
                  ["Public Relation Coordinator", "Public Relation"],
                ],
              },
              then: "Public Relation",
            },
            {
              case: {
                $in: [
                  "$sortingPosition",
                  ["Publication Coordinator", "Publication coordinator"],
                ],
              },
              then: "Publication coordinator",
            },
          ],
          default: "$sortingPosition",
        },
      },
    },
  });

  pipeline.push({
    $addFields: {
      sortIndex: { $indexOfArray: [positions, "$normalizedPosition"] },
    },
  });

  pipeline.push({
    $addFields: {
      sortIndex: {
        $cond: {
          if: { $eq: ["$sortIndex", -1] },
          then: 999,
          else: "$sortIndex",
        },
      },
    },
  });

  pipeline.push({
    $sort: { sortIndex: 1, name: 1 },
  });

  pipeline.push({
    $project: {
      sortIndex: 0,
      rawPosition: 0,
      normalizedPosition: 0,
      sortingPosition: 0,
    },
  });

  if (page && limit) {
    const skip = (page - 1) * limit;
    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        users: [{ $skip: skip }, { $limit: limit }],
      },
    });

    const result = await UserModel.aggregate(pipeline);
    const total = result[0]?.metadata[0]?.total || 0;
    const users = serializeData(result[0]?.users || []);
    return { users, total };
  } else {
    const users = serializeData(await UserModel.aggregate(pipeline));
    return { users };
  }
}

export const getUsers = (params: { approved?: boolean; query?: string; limit?: number; page?: number }) => {
  return unstable_cache(
    async () => getUsersInternal(params),
    [`users-${JSON.stringify(params)}`],
    { revalidate: 3600, tags: ["users"] }
  )();
};
