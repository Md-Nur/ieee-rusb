import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";

export async function POST(req: Request) {
  await dbConnect();
  const { id, isApproved } = await req.json();
  const updatedContent = ContentModel.findByIdAndUpdate(id, { isApproved });

  if (!updatedContent) {
    return Response.json({ error: "Content didn't update" }, { status: 400 });
  }
  return Response.json(
    { message: "Content updated successfully" },
    { status: 200 }
  );
}
