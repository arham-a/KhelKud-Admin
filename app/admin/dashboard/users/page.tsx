"use client";

import { useEffect, useState, useCallback } from "react";
import { adminAPI } from "@/lib/api";
import { User } from "@/lib/types";
import Pagination from "@/components/ui/Pagination";
import DataTable from "@/components/ui/DataTable";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminAPI.getUsers({
        page,
        limit: 20,
        search: search || undefined,
      });
      if (result.success) {
        setUsers(result.data);
        setPagination(result.pagination);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const columns = [
    { key: "name", label: "NAME" },
    { key: "email", label: "EMAIL" },
    { key: "phone", label: "PHONE" },
    { key: "verification", label: "VERIFICATION" },
    { key: "lastLogin", label: "LAST LOGIN" },
  ];

  const renderCell = useCallback((user: User, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <span className="text-sm font-medium">
            {user.firstName} {user.lastName}
          </span>
        );
      case "email":
        return <span className="text-sm">{user.email}</span>;
      case "phone":
        return <span className="text-sm">{user.phoneNumber}</span>;
      case "verification":
        return (
          <div className="flex gap-3">
            {user.isEmailVerified && (
              <span className="text-xs font-bold text-primary">EMAIL ✓</span>
            )}
            {user.isPhoneVerified && (
              <span className="text-xs font-bold text-secondary">PHONE ✓</span>
            )}
          </div>
        );
      case "lastLogin":
        return (
          <span className="text-sm">
            {user.lastLoginAt
              ? new Date(user.lastLoginAt).toLocaleDateString()
              : "Never"}
          </span>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white theme-text">Users</h1>
      </div>

      <div className="bg-dark-50 rounded-lg shadow-lg border border-gray-800 theme-card">
        <div className="p-4 border-b border-gray-800 theme-card-header">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
             className="w-full max-w-md px-3 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 rounded-md text-sm focus:outline-none focus:ring-0 theme-input"
         />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 theme-muted">Loading users...</div>
        ) : error ? (
          <div className="p-4 m-4 bg-red-500/10 border border-red-500/20 rounded-md error-box">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-400 theme-muted">No users found</div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={users}
              renderCell={renderCell}
              ariaLabel="Users table"
            />
            {pagination && <Pagination pagination={pagination} onPageChange={setPage} />}
          </>
        )}
      </div>
    </div>
  );
}
