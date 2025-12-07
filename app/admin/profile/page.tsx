"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { Admin } from "@/lib/types";
import Card from "@/components/ui/Card";

export default function ProfilePage() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminAPI.getProfile();
      if (result.success) {
        setAdmin(result.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 theme-muted">Loading profile...</div>
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

  if (!admin) return null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-white mb-6 theme-text">Admin Profile</h1>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-2xl shadow-lg shadow-primary/20">
              {admin.firstName.charAt(0).toUpperCase()}
              {admin.lastName.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 theme-muted">
                First Name
              </label>
              <p className="text-sm text-white theme-text">{admin.firstName}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 theme-muted">
                Last Name
              </label>
              <p className="text-sm text-white theme-text">{admin.lastName}</p>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1 theme-muted">Email</label>
              <p className="text-sm text-white theme-text">{admin.email}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 theme-muted">Role</label>
              <span className="text-xs font-bold text-primary">
                {admin.role.toUpperCase()}
              </span>
            </div>

            {admin.createdAt && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 theme-muted">
                  Member Since
                </label>
                <p className="text-sm text-white theme-text">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
