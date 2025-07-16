import { connectDB } from "@/app/lib/connectDB";
import User from "../../../../models/userModel";
import { cookies } from "next/headers";

export async function POST(request) {
  await connectDB();
  const cookieStore = await cookies();
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return Response.json({ error: "Invalid Credentials!" }, { status: 400 });
    }
    cookieStore.set("userId", user.id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return Response.json(user, {
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
}
