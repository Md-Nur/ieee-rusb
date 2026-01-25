import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";
import { getUsers } from "@/lib/user-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Alumni",
  description: "Celebrating our alumni and their continued legacy in the technical world.",
};

const Alumni = async () => {
  const { users } = await getUsers({ query: "alumni", approved: true });
  const serializedUsers = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  return (
    <div className="w-full">
      <Title>Alumni</Title>
      {/* @ts-ignore */}
      <ShowUsers query="alumni" initialData={serializedUsers} />
    </div>
  );
};

export default Alumni;
