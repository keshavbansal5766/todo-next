"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input.trim());
      setInput("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new Task..."
        className="w-full p-3 pr-12 rounded-lg bg-card border focus:outline-none focus:ring-2 transition-all"
        name=""
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-primary disabled:opacity-50 text-primary-foreground disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </form>
  );
};

export default TodoForm;
