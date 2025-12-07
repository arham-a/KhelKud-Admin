"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { DashboardMetrics } from "@/lib/types";
import MetricCard from "@/components/ui/MetricCard";
import {
  WifiIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import OrganizationChart from "@/components/charts/OrganizationChart";
import OrganizationTypeChart from "@/components/charts/OrganizationTypeChart";
import ThemedDropdown from "@/components/ui/ThemedDropdown";


export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

  const dateRangeOptions = [
    { key: "7d", label: "Last 7 Days" },
    { key: "30d", label: "Last 30 Days" },
    { key: "90d", label: "Last 90 Days" },
  ];

  useEffect(() => {
    fetchMetrics();
  }, [dateRange]);

  const fetchMetrics = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminAPI.getMetrics({ dateRange });
      if (result.success) {
        setMetrics(result.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch metrics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading metrics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-md error-box">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-white theme-text">Dashboard Overview</h1>
        <ThemedDropdown
          options={dateRangeOptions}
          selectedKey={dateRange}
          onSelectionChange={(key) => setDateRange(key as "7d" | "30d" | "90d")}
          ariaLabel="Date Range Selection"
        />
      </div>

      {/* User Metrics */}
      <div>
        <h2 className="text-sm sm:text-base font-medium text-gray-300 mb-3 theme-subtext">User Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <MetricCard
            title="Total Users"
            value={metrics.userMetrics.totalUsers.toLocaleString()}
            color="primary"
            href="/admin/dashboard/users"
          />
          <MetricCard
            title="Active (24h)"
            value={metrics.userMetrics.activeUsers24h.toLocaleString()}
            icon={WifiIcon}
            color="success"
          />
          <MetricCard
            title="Active (7d)"
            value={metrics.userMetrics.activeUsers7d.toLocaleString()}
            icon={ChartBarIcon}
            color="secondary"
          />
        </div>
      </div>

      {/* Organization Metrics */}
      <div>
        <h2 className="text-sm sm:text-base font-medium text-gray-300 mb-3 theme-subtext">Organization Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-dark-50 rounded-lg shadow-lg border border-gray-800 p-4 sm:p-6 theme-card">
            <h3 className="text-sm font-medium text-gray-300 mb-4 theme-subtext">By Status</h3>
            <div className="w-full overflow-hidden">
              <OrganizationChart
                total={metrics.organizationMetrics.total}
                verified={metrics.organizationMetrics.verified}
                pending={metrics.organizationMetrics.pending}
                suspended={metrics.organizationMetrics.suspended}
              />
            </div>
          </div>
          <div className="bg-dark-50 rounded-lg shadow-lg border border-gray-800 p-4 sm:p-6 theme-card">
            <h3 className="text-sm font-medium text-gray-300 mb-4 theme-subtext">By Type</h3>
            <div className="w-full overflow-hidden">
              <OrganizationTypeChart
                commercial={metrics.organizationMetrics.byType.commercial}
                educational={metrics.organizationMetrics.byType.educational}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking & Revenue Metrics */}
      <div>
        <h2 className="text-sm sm:text-base font-medium text-gray-300 mb-3 theme-subtext">Booking & Revenue</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <MetricCard
            title="Total Bookings"
            value={metrics.bookingMetrics.totalBookings.toLocaleString()}
            color="secondary"
            href="/admin/dashboard/bookings"
          />
          <MetricCard
            title="Total Revenue"
            value={`PKR ${metrics.bookingMetrics.totalRevenue.toLocaleString()}`}
            icon={CurrencyDollarIcon}
            color="success"
          />
        </div>
      </div>
    </div>
  );
}
