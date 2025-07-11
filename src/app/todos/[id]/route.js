import Todo from "../../../../models/todoModel";
import { connectDB } from "@/app/lib/connectDB";

export async function GET(_, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const todo = await Todo.findById(id);
    if (todo) {
      return Response.json(todo);
    }
    return Response.json({ error: "Todo not found" });
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
    const editedTodo = await Todo.findByIdAndUpdate(id, editTodoData, {
      new: true,
    });
    return Response.json(editedTodo);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(_, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    await Todo.findByIdAndDelete(id);
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.log(error);
  }
}
