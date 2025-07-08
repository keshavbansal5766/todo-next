import todosData from "../../../../todos";

export async function GET(_, context) {
  const { id } = await context.params;
  const data = todosData.find((item) => item.id === parseInt(id));
  if (data) {
    return Response.json(data);
  }

  return Response.json({ message: "Todo not found" });
}
