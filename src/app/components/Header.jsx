"use client";

import React from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";

const Header = () => {
  const { theme = "dark", setTheme } = useTheme();
  return (
    <header className="mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-600">
        Todo App
      </h1>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full hover:bg-muted transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>
    </header>
  );
};

export default Header;
