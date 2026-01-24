import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import { getUsers } from "@/lib/user-data";

export const dynamic = "force-dynamic";

const studentMembers = async () => {
  const { users } = await getUsers({ query: "student-member", approved: true });
  const serializedUsers = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  return (
    <div className="w-full">
      <Title>Student Members</Title>
      {/* @ts-ignore */}
      <ShowUsers query="student-member" initialData={serializedUsers} />
    </div>
  );
};

export default studentMembers;
