import { getLoggedInUser } from "@/app/lib/auth";
import Todo from "../../../../../models/todoModel";
import { connectDB } from "@/app/lib/connectDB";

export async function GET(_, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const user = await getLoggedInUser();

    if (user instanceof Response) {
      return user;
    }

    const todo = await Todo.findOne({ id: id, userId: user.id });
    if (todo) {
      return Response.json(todo);
    }
    return Response.json({ error: "Todo not found" }, { status: 401 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, context) {
  try {
    await connectDB();
    const editTodoData = await request.json();
    const { id } = await context.params;
    // we give new: true so it will return newly updated data
    const user = await getLoggedInUser();
    if (user instanceof Response) {
      return user;
    }
    const editedTodo = await Todo.updateOne(
      { _id: id, userId: user.id },
      editTodoData,
      {
        new: true,
      }
    );
    return Response.json(editedTodo);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(_, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const user = await getLoggedInUser();
    if (user instanceof Response) {
      return user;
    }
    await Todo.deleteOne({ _id: id, userId: user.id });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.log(error);
  }
}
