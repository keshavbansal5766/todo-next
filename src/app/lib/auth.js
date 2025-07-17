import User from "../../../models/userModel";
import { cookies } from "next/headers";
import { createHmac } from "crypto";

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const errorResponse = Response.json(
    { error: "Please login" },
    { status: 401 }
  );

  const cookie = cookieStore.get("userId")?.value;

  if (!cookie) {
    return errorResponse;
  }

  const userId = verifyCookie(cookie);

  if (!userId) {
    return errorResponse;
  }

  const user = await User.findById(userId);
  if (!user) {
    return errorResponse;
  }
  return user;
}

export function signCookie(cookie) {
  const signature = createHmac("sha256", process.env.COOKIE_SECRET)
    .update(cookie)
    .digest("hex");

  return `${cookie}.${signature}`;
}

export function verifyCookie(signedCookie) {
  const [cookie, signatureFromCookie] = signedCookie.split(".");
  const signature = signCookie(cookie).split(".")[1];

  if (signature === signatureFromCookie) {
    return cookie;
  } else {
    return false;
  }
}
