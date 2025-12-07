"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { useTheme } from "@/components/ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authAPI.login(email, password);

      if (result.success) {
        // Store email for 2FA step
        localStorage.setItem("adminEmail", email);
        // Navigate to 2FA page
        router.push("/auth/admin/verify-2fa");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 ${
      theme === "dark" ? "bg-black" : "bg-gray-100"
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 sm:p-3 rounded-lg shadow-lg transition-colors z-10 ${
          theme === "dark"
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
        }`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>

      <div className="max-w-md w-full">
        <div className={`rounded-lg shadow-2xl p-6 sm:p-8 ${
          theme === "dark"
            ? "bg-dark-50 border border-gray-800"
            : "bg-white border border-gray-200"
        }`}>
          <div className="text-center mb-6 sm:mb-8">
            <h1 className={`text-xl sm:text-2xl font-semibold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>Admin Login</h1>
            <p className={`text-xs sm:text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>Sign in to access the dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button type="submit" isLoading={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
