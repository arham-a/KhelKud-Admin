"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface NavbarProps {
  adminName?: string;
}

export default function Navbar({ adminName }: NavbarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Clear cookies by calling logout endpoint or just redirect
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("mockAccessToken");
      localStorage.removeItem("mockRefreshToken");
      router.push("/auth/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="h-16 bg-dark-50 border-b border-gray-800 flex items-center justify-between px-6 theme-navbar">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-800 transition-colors theme-toggle-btn"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 focus:outline-none hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium text-sm shadow-lg">
              {adminName ? adminName.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="text-sm font-medium text-white theme-text">{adminName || "Admin"}</span>
            <svg
              className="w-4 h-4 text-gray-400 theme-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-dark-50 rounded-md shadow-lg border border-gray-800 py-1 z-10 theme-dropdown">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors theme-dropdown-item"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
