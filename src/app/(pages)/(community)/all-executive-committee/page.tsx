import ShowUsers from "@/components/ShowUsers";

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
          <div className="max-w-7xl mx-auto px-4 md:px-10 pt-8">
            <h2 className="text-3xl md:text-5xl font-black text-base-content">
              Executive Committee {term}
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full mt-4 mb-2"></div>
          </div>
          {/* @ts-ignore */}
          <ShowUsers query="all-executive-committee" initialData={grouped[term]} />
        </div>
      ))}
    </div>
  );
};

export default AllExecutiveCommittee;
