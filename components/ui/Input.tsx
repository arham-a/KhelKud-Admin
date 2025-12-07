"use client";

import { InputHTMLAttributes } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-1 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          theme === "dark"
            ? "bg-dark-50 border border-gray-700 text-white placeholder-gray-500"
            : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400"
        } ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
