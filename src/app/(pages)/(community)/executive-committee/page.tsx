import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

export const metadata = {
  title: "Executive Committee",
  description: "Meet the dedicated student leaders and volunteers of the IEEE RUSB Executive Committee.",
};
import { getUsers } from "@/lib/user-data";

export const dynamic = "force-dynamic";

const ExecutiveCommittee = async () => {
  const { users } = await getUsers({ query: "executive-committee", approved: true });
  const serializedUsers = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  return (
    <div className="w-full">
      <Title>Executive Committee</Title>
      {/* @ts-ignore */}
      <ShowUsers query="executive-committee" initialData={serializedUsers} />
    </div>
  );
};

export default ExecutiveCommittee;
