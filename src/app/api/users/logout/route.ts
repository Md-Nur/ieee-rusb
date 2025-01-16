import { cookies } from "next/headers";


export async function GET() {
    const cookieStore = await cookies();
    cookieStore.set("userToken", "");
  return Response.json({ message: "You are logged out" }, { status: 200 });
}