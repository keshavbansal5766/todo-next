import { getLoggedInUser } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/connectDB";

export async function GET() {
  await connectDB();
  const user = await getLoggedInUser();

  if (user instanceof Response) {
    return user;
  }

  return Response.json(user);
}
