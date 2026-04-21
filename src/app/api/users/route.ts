import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { positions } from "@/lib/constants";


export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const approved = searchParams.get("approved");
    const position = searchParams.get("position");
    const search = searchParams.get("search");
    const dept = searchParams.get("dept");
    let query = searchParams.get("query");
    const society = searchParams.get("society");
    const designation = searchParams.get("designation");
    
    // Pagination params
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const isPaginated = pageParam && limitParam;

    const page = parseInt(pageParam || "1", 10);
    const limit = parseInt(limitParam || "10", 10);
    const skip = (page - 1) * limit;

    if (query) {
      query = query?.replace("-and-", "-&-");
    }

    const match: any = {};
    if (approved !== null) match.isApproved = approved === "true";
    if (position) match.position = position;
    if (dept) match.dept = dept;

    if (search) {
      match.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { ieee_id: { $regex: search, $options: "i" } },
      ];
    }

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

    // Ensure Alumni ONLY show on the alumni page (not on other public committees/societies/positions)
    // We restrict this exclusively when query, society, or position is defined to ensure Admin dashboards can still view them.
    if ((query || society || position) && query !== "alumni") {
      pipeline.push({
        $match: {
          roles: {
            $ne: "alumni",
          },
          position: {
            $ne: "Alumni",
          },
        },
      });
    }

    if (query === "executive-committee") {
      pipeline.push({
        $match: {
          position: {
            $ne: "Other",
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
      query === "robotics-&-automation-society" ||
      society
    ) {
      isSocietyQuery = true;
      const targetSociety = query || society;
      pipeline.push({
        $match: {
          societies: {
            $elemMatch: { $eq: targetSociety },
          },
        },
      });

      if (designation) {
        pipeline.push({
          $match: {
            society_designations: {
              $elemMatch: {
                society: targetSociety,
                designation: designation
              }
            }
          }
        });
      }
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
        sortIndex: { $indexOfArray: [positions, "$sortingPosition"] },
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
        sortingPosition: 0,
      },
    });

    if (isPaginated) {
      pipeline.push({
        $facet: {
          metadata: [{ $count: "total" }],
          users: [{ $skip: skip }, { $limit: limit }],
        },
      });

      const result = await UserModel.aggregate(pipeline);
      
      const total = result[0]?.metadata[0]?.total || 0;
      const users = result[0]?.users || [];
      const totalPages = Math.ceil(total / limit);

      return NextResponse.json({
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      });
    } else {
      const users = await UserModel.aggregate(pipeline);
      return NextResponse.json(users);
    }
  } catch (error: any) {
    console.error("Fetch Users Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}
