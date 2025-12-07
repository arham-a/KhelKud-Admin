"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  ChartBarSquareIcon,
  UsersIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: ChartBarSquareIcon },
  { name: "Users", href: "/admin/dashboard/users", icon: UsersIcon },
  { name: "Bookings", href: "/admin/dashboard/bookings", icon: CalendarDaysIcon },
  { name: "Organizations", href: "/admin/dashboard/organizations", icon: BuildingOfficeIcon },
  { name: "Venues", href: "/admin/dashboard/venues", icon: MapPinIcon },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("mockAccessToken");
      localStorage.removeItem("mockRefreshToken");
      router.push("/auth/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className={`flex flex-col w-64 bg-dark-50 border-r border-gray-800 h-screen fixed theme-sidebar z-50 transition-transform duration-300 lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-800 theme-sidebar-header">
        {/* Logo */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
          K
        </div>
        {/* Text */}
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-white theme-text leading-tight">Admin Dashboard</h1>
          <p className="text-[10px] text-gray-400 theme-muted">by Khelkud</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 border ${
                isActive
                  ? "bg-primary/20 text-primary border-primary/30 shadow-lg shadow-primary/10"
                  : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800 hover:text-white border-transparent"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-transparent"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 theme-card-header">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
            theme === "dark"
              ? "text-gray-300 hover:bg-gray-800 hover:text-white"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          {theme === "dark" ? (
            <>
              <SunIcon className="mr-3 h-5 w-5" />
              Light Mode
            </>
          ) : (
            <>
              <MoonIcon className="mr-3 h-5 w-5" />
              Dark Mode
            </>
          )}
        </button>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium text-sm shadow-lg mr-3">
              A
            </div>
            <span className="flex-1 text-left">Admin</span>
            <UserIcon className="h-5 w-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-dark-50 rounded-md shadow-lg border border-gray-800 py-1 theme-dropdown">
              <Link
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors theme-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Profile
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors theme-dropdown-item"
              >
                <div className="flex items-center">
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
