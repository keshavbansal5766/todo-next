"use client";

import { useState } from "react";
import { PencilIcon, X, TrashIcon, Check } from "lucide-react";

const TodoItem = ({ todo, deleteTodo, toggleTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border group bg-card hover:border-primary transition-all ${
        todo.completed ? "bg-opacity-70" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`flex justify-center items-center flex-shrink-0 w-5 h-5 rounded-md border transition-colors ${
            todo.completed
              ? "bg-primary border-primary"
              : "border-muted-foreground hover:border-primary"
          }`}
        >
          {todo.completed && (
            <Check className="w-4 h-4 text-primary-foreground " />
          )}
        </button>
        {isEditing ? (
          <div className="flex-1">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full p-0 bg-transparent border-0 border-b border-primary focus:outline-none focus:ring-0"
            />
          </div>
        ) : (
          <p
            className={`flex-1 transition-opacity ${
              todo.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.text}
          </p>
        )}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1.5 rounded-md text-green-500 hover:bg-green-500/10 transition-colors"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-1.5 rounded-md text-blue-500 hover:bg-blue-500/10 transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
