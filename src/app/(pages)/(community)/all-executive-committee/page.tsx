import ShowUsers from "@/components/ShowUsers";
import Title from "@/components/Title";

export const metadata = {
  title: "All Executive Committee",
  description: "Meet all past and present executive committee members of IEEE RUSB.",
};

import { getUsers } from "@/lib/user-data";

export const dynamic = "force-dynamic";

const AllExecutiveCommittee = async () => {
  const { users } = await getUsers({ query: "all-executive-committee", approved: true });
  const serializedUsers = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  const grouped = serializedUsers.reduce((acc: Record<string, any[]>, user: any) => {
    const term = user.ecTerm || "Unknown Term";
    if (!acc[term]) acc[term] = [];
    acc[term].push(user);
    return acc;
  }, {});

  const sortedTerms = Object.keys(grouped).sort((a, b) => {
    if (a === "Unknown Term") return 1;
    if (b === "Unknown Term") return -1;
    return b.localeCompare(a);
  });

  return (
    <div className="w-full">
      {sortedTerms.map((term) => (
        <div key={term}>
          <Title>{term}</Title>
          {/* @ts-ignore */}
          <ShowUsers query="all-executive-committee" initialData={grouped[term]} />
        </div>
      ))}
    </div>
  );
};

export default AllExecutiveCommittee;
