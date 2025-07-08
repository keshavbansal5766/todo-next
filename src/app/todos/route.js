import todosData from "../../../todos";

export async function GET() {
  return Response.json(todosData);
}
