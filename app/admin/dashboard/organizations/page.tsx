"use client";

import { useEffect, useState, useCallback } from "react";
import { adminAPI } from "@/lib/api";
import { Organization } from "@/lib/types";
import { Checkbox, Input } from "@heroui/react";
import Pagination from "@/components/ui/Pagination";
import StatusBadge from "@/components/ui/StatusBadge";
import DataTable from "@/components/ui/DataTable";
import ThemedDropdown from "@/components/ui/ThemedDropdown";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"" | "pending_verification" | "verified" | "suspended" | "inactive">("");
  const [orgType, setOrgType] = useState<"" | "commercial" | "educational">("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [changingStatus, setChangingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchOrganizations();
  }, [page, search, status, orgType, includeDeleted]);

  const fetchOrganizations = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminAPI.getOrganizations({
        page,
        limit: 20,
        search: search || undefined,
        status: status || undefined,
        organizationType: orgType || undefined,
        includeDeleted,
      });
      if (result.success) {
        setOrganizations(result.data);
        setPagination(result.pagination);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch organizations");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = async (
    organizationId: string,
    newStatus: "pending_verification" | "verified" | "suspended" | "inactive"
  ) => {
    if (!window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)) {
      return;
    }

    setChangingStatus(organizationId);
    try {
      const result = await adminAPI.changeOrganizationStatus(organizationId, newStatus);
      if (result.success) {
        fetchOrganizations();
      }
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setChangingStatus(null);
    }
  };

  const columns = [
    { key: "name", label: "NAME" },
    { key: "type", label: "TYPE" },
    { key: "status", label: "STATUS" },
    { key: "owner", label: "OWNER" },
    { key: "location", label: "LOCATION" },
    { key: "actions", label: "ACTIONS" },
  ];

  const statusOptions = [
    { key: "", label: "All Statuses" },
    { key: "pending_verification", label: "Pending" },
    { key: "verified", label: "Verified" },
    { key: "suspended", label: "Suspended" },
    { key: "inactive", label: "Inactive" },
  ];

  const orgTypeOptions = [
    { key: "", label: "All Types" },
    { key: "commercial", label: "Commercial" },
    { key: "educational", label: "Educational" },
  ];

  const actionOptions = [
    { key: "verified", label: "Verify" },
    { key: "suspended", label: "Suspend" },
    { key: "inactive", label: "Deactivate" },
    { key: "pending_verification", label: "Pending" },
  ];

  const renderCell = useCallback((org: Organization, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            {org.logoUrl && (
              <img
                src={org.logoUrl}
                alt={org.name}
                className="w-8 h-8 rounded object-cover border border-gray-700"
              />
            )}
            <span className="text-sm font-medium">{org.name}</span>
          </div>
        );
      case "type":
        return (
          <span className="text-xs font-bold">
            {org.organizationType.toUpperCase()}
          </span>
        );
      case "status":
        return <StatusBadge status={org.status} type="organization" />;
      case "owner":
        return (
          <div>
            <div className="text-sm">{org.owner.firstName} {org.owner.lastName}</div>
            <div className="text-xs text-gray-500">{org.owner.email}</div>
          </div>
        );
      case "location":
        return <span className="text-sm">{org.city}, {org.province}</span>;
      case "actions":
        return (
          <ThemedDropdown
            options={actionOptions}
            selectedKey={org.status}
            onSelectionChange={(key) => handleStatusChange(org.id, key as any)}
            placeholder="Change status"
            size="sm"
            isDisabled={changingStatus === org.id}
          />
        );
      default:
        return null;
    }
  }, [changingStatus, actionOptions]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white theme-text">Organizations</h1>
      </div>

      <div className="bg-dark-50 rounded-lg shadow-lg border border-gray-800 theme-card">
        <div className="p-4 border-b border-gray-800 theme-card-header">
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Search organizations"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary theme-input"
            />

            <ThemedDropdown
              options={statusOptions}
              selectedKey={status}
              onSelectionChange={(key) => {
                setStatus(key as any);
                setPage(1);
              }}
              placeholder="Select status"
            />

            <ThemedDropdown
              options={orgTypeOptions}
              selectedKey={orgType}
              onSelectionChange={(key) => {
                setOrgType(key as any);
                setPage(1);
              }}
              placeholder="Select type"
            />

            <label className="flex items-center gap-2 text-sm text-gray-300 theme-subtext">
              <input
                type="checkbox"
                checked={includeDeleted}
                onChange={(e) => {
                  setIncludeDeleted(e.target.checked);
                  setPage(1);
                }}
                className="rounded border-gray-700 bg-black text-primary focus:ring-primary theme-checkbox"
              />
              Include Deleted
            </label>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 theme-muted">Loading organizations...</div>
        ) : error ? (
          <div className="p-4 m-4 bg-red-500/10 border border-red-500/20 rounded-md error-box">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : organizations.length === 0 ? (
          <div className="p-8 text-center text-gray-400 theme-muted">No organizations found</div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={organizations}
              renderCell={renderCell}
              ariaLabel="Organizations table"
            />
            {pagination && <Pagination pagination={pagination} onPageChange={setPage} />}
          </>
        )}
      </div>
    </div>
  );
}
