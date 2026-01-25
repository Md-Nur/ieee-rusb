import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import { getUsers } from "@/lib/user-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Faculty Members",
  description: "Honoring the faculty members and mentors providing guidance to IEEE RUSB.",
};

const facultyMembers = async () => {
  const { users } = await getUsers({ query: "faculty-member", approved: true });
  const serializedUsers = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  return (
    <div className="w-full">
      <Title>Faculty Members</Title>
      {/* @ts-ignore */}
      <ShowUsers query="faculty-member" initialData={serializedUsers} />
    </div>
  );
};

export default facultyMembers;
