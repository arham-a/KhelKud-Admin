"use client";

import { useEffect, useState, useCallback } from "react";
import { adminAPI } from "@/lib/api";
import { Booking } from "@/lib/types";
import Pagination from "@/components/ui/Pagination";
import StatusBadge from "@/components/ui/StatusBadge";
import DataTable from "@/components/ui/DataTable";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBookings();
  }, [page, search]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminAPI.getBookings({
        page,
        limit: 20,
        search: search || undefined,
      });
      if (result.success) {
        setBookings(result.data);
        setPagination(result.pagination);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const columns = [
    { key: "reference", label: "REFERENCE", align: "center" as const },
    { key: "user", label: "USER", align: "center" as const },
    { key: "venue", label: "VENUE", align: "center" as const },
    { key: "datetime", label: "DATE & TIME" },
    { key: "status", label: "STATUS" },
    { key: "amount", label: "AMOUNT" },
  ];

  const renderCell = useCallback((booking: Booking, columnKey: string) => {
    switch (columnKey) {
      case "reference":
        return <span className="text-sm font-medium">{booking.bookingReference}</span>;
      case "user":
        return <span className="text-sm">{booking.userName}</span>;
      case "venue":
        return <span className="text-sm">{booking.venueName}</span>;
      case "datetime":
        return (
          <div>
            <div className="text-sm">{new Date(booking.startTime).toLocaleDateString()}</div>
            <div className="text-xs text-gray-500">
              {new Date(booking.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(booking.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        );
      case "status":
        return <StatusBadge status={booking.status} type="booking" />;
      case "amount":
        return <span className="text-sm font-medium text-primary">PKR {booking.totalAmount.toLocaleString()}</span>;
      default:
        return null;
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white theme-text">Bookings</h1>
      </div>

      <div className="bg-dark-50 rounded-lg shadow-lg border border-gray-800 theme-card">
        <div className="p-4 border-b border-gray-800 theme-card-header">
          <input
            type="text"
            placeholder="Search by booking reference or user name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-w-md px-3 py-2 bg-black border border-gray-700 text-white placeholder-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary theme-input"
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 theme-muted">Loading bookings...</div>
        ) : error ? (
          <div className="p-4 m-4 bg-red-500/10 border border-red-500/20 rounded-md error-box">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-400 theme-muted">No bookings found</div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={bookings}
              renderCell={renderCell}
              ariaLabel="Bookings table"
            />
            {pagination && <Pagination pagination={pagination} onPageChange={setPage} />}
          </>
        )}
      </div>
    </div>
  );
}
