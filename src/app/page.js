"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useRouter } from "next/navigation";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const todosData = await response.json();

      if (response.status === 401) {
        return router.push("/login");
      }

      if (!todosData.error) {
        if (Array.isArray(todosData)) {
          setTodos(todosData.slice().reverse());
        } else {
          throw new Error("Invalid todos format");
        }
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return;

    const newTodo = await response.json();
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete. Refetching...");
        fetchTodos();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      fetchTodos();
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        console.error("Failed to toggle todo on server. Rolling back.");
        fetchTodos();
      }
    } catch (err) {
      console.error("Toggle error:", err);
      fetchTodos();
    }
  };

  const updateTodo = async (id, newText) => {
    const oldTodo = todos.find((todo) => todo.id === id);

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });

      if (!response.ok) {
        console.error("Failed to toggle todo on server. Rolling back.");
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? oldTodo : todo))
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? oldTodo : todo)));
    }
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
