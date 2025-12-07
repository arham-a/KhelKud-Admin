"use client";

import { useEffect, useState, useCallback } from "react";
import { adminAPI } from "@/lib/api";
import { Venue } from "@/lib/types";
import Pagination from "@/components/ui/Pagination";
import StatusBadge from "@/components/ui/StatusBadge";
import DataTable from "@/components/ui/DataTable";

type VenueTab = "published" | "pending";

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<VenueTab>("published");

  useEffect(() => {
    fetchVenues();
  }, [page, search, activeTab]);

  const fetchVenues = async () => {
    setLoading(true);
    setError("");
    try {
      const result =
        activeTab === "published"
          ? await adminAPI.getPublishedVenues({
              page,
              limit: 20,
              search: search || undefined,
            })
          : await adminAPI.getPendingVerificationVenues({
              page,
              limit: 20,
              search: search || undefined,
            });

      if (result.success) {
        setVenues(result.data);
        setPagination(result.pagination);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch venues");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleTabChange = (tab: VenueTab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const columns = [
    { key: "name", label: "NAME"},
    { key: "organization", label: "ORGANIZATION" },
    { key: "location", label: "LOCATION" },
    { key: "status", label: "STATUS" },
    { key: "published", label: "PUBLISHED" },
    { key: "created", label: "CREATED" },
  ];

  const renderCell = useCallback((venue: Venue, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return <span className="text-sm font-medium">{venue.name}</span>;
      case "organization":
        return <span className="text-sm">{venue.organizationName}</span>;
      case "location":
        return <span className="text-sm">{venue.city}, {venue.province}</span>;
      case "status":
        return <StatusBadge status={venue.verificationStatus} type="venue" />;
      case "published":
        return venue.isPublished ? (
          <span className="text-xs font-bold text-primary">YES</span>
        ) : (
          <span className="text-xs font-bold text-gray-400">NO</span>
        );
      case "created":
        return <span className="text-sm">{new Date(venue.createdAt).toLocaleDateString()}</span>;
      default:
        return null;
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white theme-text">Venues</h1>
      </div>

      <div className="bg-dark-50 rounded-lg shadow-lg border border-gray-800 theme-card">
        {/* Tabs */}
        <div className="border-b border-gray-800 theme-card-header">
          <nav className="flex -mb-px">
            <button
              onClick={() => handleTabChange("published")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors theme-tab ${
                activeTab === "published"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              Published
            </button>
            <button
              onClick={() => handleTabChange("pending")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors theme-tab ${
                activeTab === "pending"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              Pending Verification
            </button>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-800 theme-card-header">
          <input
            type="text"
            placeholder="Search venues..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-w-md px-3 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary theme-input"
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 theme-muted">Loading venues...</div>
        ) : error ? (
          <div className="p-4 m-4 bg-red-500/10 border border-red-500/20 rounded-md error-box">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : venues.length === 0 ? (
          <div className="p-8 text-center text-gray-400 theme-muted">No venues found</div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={venues}
              renderCell={renderCell}
              ariaLabel="Venues table"
            />
            {pagination && <Pagination pagination={pagination} onPageChange={setPage} />}
          </>
        )}
      </div>
    </div>
  );
}
