import {
  ApiResponse,
  PaginatedResponse,
  LoginResponse,
  Verify2FAResponse,
  Admin,
  DashboardMetrics,
  User,
  Booking,
  Organization,
  Venue,
  PaginationParams,
  OrganizationFilters,
  MetricsParams,
} from "./types";
import { USE_MOCK_API } from "./config";
import { mockAuthAPI, mockAdminAPI } from "./mockApi";

const API_BASE_URL = "https://khel-kud.onrender.com/api/v1";

class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || "An error occurred"
    );
  }

  return data;
}

// Auth API
export const authAPI = USE_MOCK_API ? mockAuthAPI : {
  login: async (email: string, password: string) => {
    return fetcher<ApiResponse<LoginResponse>>("/auth/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  verify2FA: async (email: string, code: string) => {
    return fetcher<ApiResponse<Verify2FAResponse>>("/auth/admin/verify-2fa", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
  },

  logout: async () => {
    return fetcher<ApiResponse<null>>("/auth/admin/logout", {
      method: "POST",
    });
  },
};

// Admin API - Use mock or real based on config
const realAdminAPI = {
  getProfile: async () => {
    return fetcher<ApiResponse<Admin>>("/admin/profile");
  },

  getMetrics: async (params?: MetricsParams) => {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append("startDate", params.startDate);
    if (params?.endDate) queryParams.append("endDate", params.endDate);
    if (params?.dateRange) queryParams.append("dateRange", params.dateRange);

    const query = queryParams.toString();
    return fetcher<ApiResponse<DashboardMetrics>>(
      `/admin/metrics${query ? `?${query}` : ""}`
    );
  },

  getUsers: async (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const query = queryParams.toString();
    return fetcher<PaginatedResponse<User>>(
      `/admin/users${query ? `?${query}` : ""}`
    );
  },

  getBookings: async (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const query = queryParams.toString();
    return fetcher<PaginatedResponse<Booking>>(
      `/admin/bookings${query ? `?${query}` : ""}`
    );
  },

  getOrganizations: async (params?: OrganizationFilters) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.status) queryParams.append("status", params.status);
    if (params?.organizationType)
      queryParams.append("organizationType", params.organizationType);
    if (params?.includeDeleted)
      queryParams.append("includeDeleted", params.includeDeleted.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const query = queryParams.toString();
    return fetcher<PaginatedResponse<Organization>>(
      `/admin/organizations${query ? `?${query}` : ""}`
    );
  },

  changeOrganizationStatus: async (
    organizationId: string,
    status: "pending_verification" | "verified" | "suspended" | "inactive"
  ) => {
    return fetcher<ApiResponse<Organization>>(
      `/admin/organizations/${organizationId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );
  },

  getPublishedVenues: async (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const query = queryParams.toString();
    return fetcher<PaginatedResponse<Venue>>(
      `/admin/venues/published${query ? `?${query}` : ""}`
    );
  },

  getPendingVerificationVenues: async (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const query = queryParams.toString();
    return fetcher<PaginatedResponse<Venue>>(
      `/admin/venues/pending-verification${query ? `?${query}` : ""}`
    );
  },
};

export const adminAPI = USE_MOCK_API ? mockAdminAPI : realAdminAPI;

export { ApiError };
