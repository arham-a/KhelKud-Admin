// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Auth Types
export interface LoginResponse {
  requiresVerification: boolean;
  email: string;
}

export interface Verify2FAResponse {
  accessToken: string;
  refreshToken: string;
  admin: Admin;
}

export interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt?: string;
}

// Metrics Types
export interface DashboardMetrics {
  userMetrics: UserMetrics;
  organizationMetrics: OrganizationMetrics;
  bookingMetrics: BookingMetrics;
}

export interface UserMetrics {
  activeUsers24h: number;
  activeUsers7d: number;
  totalUsers: number;
}

export interface OrganizationMetrics {
  total: number;
  verified: number;
  pending: number;
  suspended: number;
  inactive: number;
  deleted: number;
  byType: {
    commercial: number;
    educational: number;
  };
}

export interface BookingMetrics {
  totalBookings: number;
  totalRevenue: number;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
}

// Booking Types
export interface Booking {
  id: string;
  bookingReference: string;
  userId: string;
  userName: string;
  venueId: string;
  venueName: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  totalAmount: number;
  createdAt: string;
}

// Organization Types
export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl: string;
  status: "pending_verification" | "verified" | "suspended" | "inactive";
  organizationType: "commercial" | "educational";
  email: string;
  phone: string;
  city: string;
  province: string;
  country: string;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Venue Types
export interface Venue {
  id: string;
  name: string;
  organizationId: string;
  organizationName: string;
  city: string;
  province: string;
  country: string;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  isPublished: boolean;
  createdAt: string;
}

// Query Params Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface OrganizationFilters extends PaginationParams {
  status?: "pending_verification" | "verified" | "suspended" | "inactive";
  organizationType?: "commercial" | "educational";
  includeDeleted?: boolean;
}

export interface MetricsParams {
  startDate?: string;
  endDate?: string;
  dateRange?: "7d" | "30d" | "90d";
}
