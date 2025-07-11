import { writeFile } from "node:fs/promises";
import todosData from "../../../../todos";

export async function GET(_, context) {
  const { id } = await context.params;
  const data = todosData.find((item) => item.id === parseInt(id));
  if (data) {
    return Response.json(data);
  }
  return Response.json(
    { error: "Todo not found" },
    {
      status: 404,
    }
  );
}

export async function PUT(request, context) {
  const todo = await request.json();
  const { id } = await context.params;

  if (todo.id) {
    return Response.json(
      { error: "Id can not be changeable" },
      {
        status: 403,
      }
    );
  }

  const findTodoIndex = todosData.findIndex((item) => item.id === id);
  if (findTodoIndex === -1) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  const findTodo = todosData[findTodoIndex];

  const editedTodo = {
    ...findTodo,
    ...todo,
  };

  todosData[findTodoIndex] = editedTodo;
  await writeFile("todos.json", JSON.stringify(todosData, null, 2));
  return Response.json(editedTodo);
}

export async function DELETE(_, context) {
  const { id } = await context.params;

  // 1st way -
  // const data = todosData.find((item) => item.id === id);
  // if (data) {
  //   const newData = todosData.filter((item) => item.id !== id);
  //   await writeFile("todos.json", JSON.stringify(newData, null, 2));
  //   return Response.json({ message: "Todo deleted" }, {status : 204});
  // }
  // return Response.json(
  //   { error: "Todo not found" },
  //   {
  //     status: 404,
  //   }
  // );

  // 2nd way-
  const findTodoIndex = todosData.findIndex((item) => item.id === id);
  if (findTodoIndex >= 0) {
    todosData.splice(findTodoIndex, 1);
    await writeFile("todos.json", JSON.stringify(todosData, null, 2));
    return new Response(null, { status: 204 });
  } else {
    return Response.json(
      { error: "Todo not found" },
      {
        status: 404,
      }
    );
  }
}
