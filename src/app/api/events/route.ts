import dbConnect from "@/lib/dbConnect";
import EventModel from "@/models/event.model";

export async function GET() {
  await dbConnect();
  const events = await EventModel.find({});
  return Response.json(events);
}
