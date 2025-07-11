import { readFile, writeFile } from "node:fs/promises";
import todosData from "../../../todos";
import { connectDB } from "../lib/connectDB";

export async function GET() {
  await connectDB();

  const todoJSONString = await readFile("./todos.json", "utf-8");
  const todos = JSON.parse(todoJSONString);
  return Response.json(todos);
}

export async function POST(request) {
  const todo = await request.json();
  const newTodo = {
    id: crypto.randomUUID(),
    text: todo.text,
    completed: false,
  };

  todosData.push(newTodo);
  await writeFile("todos.json", JSON.stringify(todosData, null, 2));
  return Response.json(newTodo, {
    status: 201,
  });
}
