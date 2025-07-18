import { connectDB } from "@/app/lib/connectDB";
import User from "../../../../models/userModel";
import { cookies } from "next/headers";
import { signCookie } from "@/app/lib/auth";
import Session from "../../../../models/sessionModel";
import bcrypt from "bcrypt";

export async function POST(request) {
  await connectDB();
  const cookieStore = await cookies();
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ error: "Invalid Credentials!" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ error: "Invalid Credentials!" }, { status: 400 });
    }

    const session = await Session.create({ userId: user._id });
    console.log(session.id);

    cookieStore.set("sId", signCookie(session.id), {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return Response.json(
      { name: user.name, email: user.email },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
