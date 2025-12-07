"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { useTheme } from "@/components/ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Verify2FAPage() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail");
    if (!storedEmail) {
      router.push("/auth/admin/login");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authAPI.verify2FA(email, code);

      if (result.success) {
        // Clear temporary email storage
        localStorage.removeItem("adminEmail");
        // Navigate to dashboard
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value: string) => {
    // Only allow digits and max 6 characters
    const cleaned = value.replace(/\D/g, "").slice(0, 6);
    setCode(cleaned);
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
            }`}>Verify 2FA Code</h1>
            <p className={`text-xs sm:text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              A verification code has been sent to
              <br />
              <span className="font-medium text-primary break-all">{email}</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Enter 6-digit code"
              type="text"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="123456"
              maxLength={6}
              required
              className="text-center text-lg tracking-widest"
            />

            <Button
              type="submit"
              isLoading={loading}
              disabled={code.length !== 6}
              className="w-full"
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={() => router.push("/auth/admin/login")}
              className={`text-xs sm:text-sm transition-colors ${
                theme === "dark"
                  ? "text-primary hover:text-primary-600"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
