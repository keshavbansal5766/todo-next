import { getUserSessionId } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/connectDB";
import Session from "../../../../models/sessionModel";
import { cookies } from "next/headers";

export async function POST() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const sessionId = await getUserSessionId();
    await Session.findByIdAndDelete(sessionId);
    cookieStore.delete("sId");
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.log(error);
    return new Response.json(null, {
      status: 401,
    });
  }
}
