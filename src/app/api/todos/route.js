import { connectDB } from "../../lib/connectDB";
import Todo from "../../../../models/todoModel";
import { cookies } from "next/headers";
import User from "../../../../models/userModel";
import { getLoggedInUser } from "@/app/lib/auth";

export async function GET() {
  await connectDB();
  const user = await getLoggedInUser();
  if (user instanceof Response) {
    return user;
  }
  const allTodos = await Todo.find({ userId: user.id });

  return Response.json(
    allTodos.map(({ id, text, completed }) => ({ id, text, completed }))
  );
}

export async function POST(request) {
  await connectDB();
  const user = await getLoggedInUser();
  if (user instanceof Response) {
    return user;
  }
  const todo = await request.json();
  const { id, text, completed } = await Todo.create({
    text: todo.text,
    userId: user.id,
  });
  return Response.json(
    { id, text, completed },
    {
      status: 201,
    }
  );
}
