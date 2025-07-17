"use client";

import React from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";
import { UserIcon } from "lucide-react";

const Header = ({ user, showUserMenu, setShowUserMenu, menuRef }) => {
  const { theme = "dark", setTheme } = useTheme();
  return (
    <header className="mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-600">
        Todo App
      </h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="py-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="User menu"
          >
            <UserIcon className="h-5 w-5" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 max-w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 shadow-lg z-10 text-gray-900 dark:text-gray-100">
              <div className="text-sm font-semibold">{user.name}</div>
              <div
                className="text-xs text-gray-600 dark:text-gray-400 mb-3 truncate"
                title={user.email}
              >
                {user.email}
              </div>
              <button
                onClick={() => {
                  console.log("Logging out");
                }}
                className="w-full text-left text-red-500 hover:underline text-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
