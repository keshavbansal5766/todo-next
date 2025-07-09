import { writeFile } from "node:fs/promises";
import todosData from "../../../todos";

export async function GET(req) {
  // console.log(req);
  return Response.json(todosData);
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
