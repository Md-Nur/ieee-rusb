import { unstable_cache } from "next/cache";
import { getBaseUrl } from "./api-utils";
import { serializeData } from "./serialize";

async function getContentInternal({ 
  query, 
  society, 
  approved = true,
  limit
}: { 
  query?: string, 
  society?: string, 
  approved?: boolean,
  limit?: number
} = {}) {
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (society) params.append('society', society);
  if (approved !== undefined) params.append('approved', String(approved));
  
  // Note: limit is handled by the API if we implement it, or we slice the result here.
  // The API route currently handles 'limit' only for special queries like 'recent-events',
  // but let's assume we can fetch all and slice, or trust specific query params.
  // Actually, 'recent-events' query param logic in API handles limit=3.
  // 'upcoming-event' handles limit=1.
  
  try {
    const res = await fetch(`${getBaseUrl()}/api/contents?${params.toString()}`, {
      next: { revalidate: 3600, tags: ["content"] }
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch content: ${res.status}`);
      return [];
    }
    
    let contents = await res.json();
    
    // The API might return non-serialized data if we accessed DB directly (old way),
    // but now passing through API JSON response, it's already serialized (dates are strings).
    // However, the caller might expect serialized data format.
    
    if (limit && Array.isArray(contents)) {
       // If the API didn't handle limit for this specific query, apply it here manually
       // just in case, though efficient filtering should happen on API/DB side.
       // For 'query=recent-events' API handles it.
       if (!['recent-events', 'upcoming-event'].includes(query || '')) {
         contents = contents.slice(0, limit);
       }
    }
    
    return serializeData(contents);
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
}

export const getContent = (params: any = {}) => {
  return unstable_cache(
    async () => getContentInternal(params),
    [`content-${JSON.stringify(params)}`],
    { revalidate: 3600, tags: ["content"] }
  )();
};

export const getUpcomingEvent = unstable_cache(
  async () => {
    const events = await getContentInternal({ query: "upcoming-event", limit: 1 });
    return Array.isArray(events) ? events[0] || null : events || null;
  },
  ["upcoming-event"],
  { revalidate: 3600, tags: ["content", "upcoming-event"] }
);

export const getRecentEvents = (limit = 3, society?: string) => unstable_cache(
  async () => getContentInternal({ query: "recent-events", limit, society }),
  [`recent-events-${limit}-${society}`],
  { revalidate: 3600, tags: ["content", "recent-events"] }
)();
