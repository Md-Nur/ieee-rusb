import { unstable_cache } from "next/cache";
import { getBaseUrl } from "./api-utils";
import { serializeData } from "./serialize";

async function getUsersInternal({
  approved,
  query,
  limit,
  page,
}: {
  approved?: boolean;
  query?: string;
  limit?: number;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (limit) params.append('limit', String(limit));
  if (page) params.append('page', String(page));
  if (approved !== undefined) params.append('approved', String(approved));

  try {
    const res = await fetch(`${getBaseUrl()}/api/users?${params.toString()}`, {
      next: { revalidate: 3600, tags: ["users"] }
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch users: ${res.status}`);
      return { users: [] };
    }
    
    const data = await res.json();
    
    // API returns { users: [], pagination: {...} } if paginated (limit+page present)
    // or just [] if not paginated.
    // Our return type signature expected { users, total? }
    
    if (Array.isArray(data)) {
      return { users: serializeData(data) };
    } else {
      // It's likely the paginated response
      return { 
        users: serializeData(data.users || []),
        total: data.pagination?.total 
      };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [] };
  }
}

export const getUsers = (params: { approved?: boolean; query?: string; limit?: number; page?: number }) => {
  return unstable_cache(
    async () => getUsersInternal(params),
    [`users-${JSON.stringify(params)}`],
    { revalidate: 3600, tags: ["users"] }
  )();
};
