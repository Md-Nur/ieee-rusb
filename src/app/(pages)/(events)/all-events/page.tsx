import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";
import connectDB from "@/lib/dbConnect";
import ContentModel from "@/models/content.model";
import UserModel from "@/models/user.model";
import { serializeData } from "@/lib/serialize";

export const dynamic = "force-dynamic";

const AllEvents = async () => {
  await connectDB();
  const _ = UserModel;

  const events = await ContentModel.find({ 
    type: "event", 
    isApproved: true 
  })
  .sort({ date: -1 })
  .populate("userId", "name avatar position")
  .lean();

  const serializedEvents = serializeData(events.map(event => ({
    ...event,
    user: event.userId && typeof event.userId === 'object' ? event.userId : null,
    userId: (event.userId as any)?._id?.toString() || (event.userId as any)?.toString() || ""
  })));

  return (
    <div className="w-full overflow-x-auto">
      <Title>All Events</Title>
      {/* @ts-ignore */}
      <ShowContents query="" initialData={serializedEvents} hideIfEmpty={false} />
    </div>
  );
};

export default AllEvents;
