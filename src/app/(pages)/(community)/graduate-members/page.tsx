import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import { getUsers } from "@/lib/user-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Graduate Members",
  description: "Showcasing the graduate student members contributing to research and innovation at IEEE RUSB.",
};

const graduateMembers = async () => {
  const { users } = await getUsers({ query: "graduate-member", approved: true });
  const serializedUsers = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  return (
    <div className="w-full">
      <Title>Graduate Members</Title>
      {/* @ts-ignore */}
      <ShowUsers query="graduate-member" initialData={serializedUsers} />
    </div>
  );
};

export default graduateMembers;
