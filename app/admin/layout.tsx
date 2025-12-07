"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dark-50 theme-bg overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64 pt-10 min-w-0">
        {/* Mobile navbar */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-dark-50 border-b border-gray-800 z-30 flex items-center px-4 theme-card">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-lg font-semibold text-white theme-text">Admin Dashboard</h1>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-dark-50 theme-bg pt-20 lg:pt-6">{children}</main>
      </div>
    </div>
  );
}
