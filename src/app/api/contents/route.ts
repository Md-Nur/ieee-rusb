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
  console.log(data);
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
