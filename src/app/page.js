"use client";

import { useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const todosData = [
  { id: 1, text: "Learn Next.js 15", completed: false },
  { id: 2, text: "Master Node.js", completed: true },
  { id: 3, text: "Learn MongoDB", completed: true },
];

export default function Home() {
  const [todos, setTodos] = useState(todosData);

  const addTodo = (text) => {
    console.log(text);
  };

  const deleteTodo = (id) => {
    console.log(id);
  };

  const toggleTodo = (id) => {
    console.log(id);
  };

  const updateTodo = (id, newText) => {
    console.log(id, newText);
  };

  return (
    <div className="min-h-screen py-8 px-4 flex items-center flex-col sm:px-6">
      <div className="w-full max-w-lg">
        <Header />
        <TodoForm addTodo={addTodo} />
        <main className="mt-6">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
          />
        </main>
      </div>
    </div>
  );
}
