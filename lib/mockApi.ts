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
import {
  mockAdmin,
  mockMetrics,
  mockUsers,
  mockBookings,
  mockOrganizations,
  mockVenues,
  paginateData,
  filterData,
} from "./mockData";

// Simulate API delay
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Auth API
export const mockAuthAPI = {
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    await delay();
    
    // Accept any email/password for demo
    if (email && password) {
      return {
        success: true,
        message: "2FA code sent to your email",
        data: {
          requiresVerification: true,
          email: email,
        },
      };
    }
    
    throw new Error("Invalid credentials");
  },

  verify2FA: async (email: string, code: string): Promise<ApiResponse<Verify2FAResponse>> => {
    await delay();
    
    // Accept any 6-digit code for demo
    if (code.length === 6) {
      // Set mock cookies in localStorage (since we can't set httpOnly in frontend)
      localStorage.setItem("mockAccessToken", "mock-access-token");
      localStorage.setItem("mockRefreshToken", "mock-refresh-token");
      
      return {
        success: true,
        message: "Login successful",
        data: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          admin: mockAdmin,
        },
      };
    }
    
    throw new Error("Invalid or expired 2FA code");
  },

  logout: async (): Promise<ApiResponse<null>> => {
    await delay();
    localStorage.removeItem("mockAccessToken");
    localStorage.removeItem("mockRefreshToken");
    return {
      success: true,
      message: "Logged out successfully",
      data: null,
    };
  },
};

// Mock Admin API
export const mockAdminAPI = {
  getProfile: async (): Promise<ApiResponse<Admin>> => {
    await delay();
    return {
      success: true,
      message: "Admin profile retrieved successfully",
      data: mockAdmin,
    };
  },

  getMetrics: async (params?: MetricsParams): Promise<ApiResponse<DashboardMetrics>> => {
    await delay();
    return {
      success: true,
      message: "Dashboard Metrics Fetched Successfully",
      data: mockMetrics,
    };
  },

  getUsers: async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
    await delay();
    
    let filteredUsers = mockUsers;
    
    // Apply search filter
    if (params?.search) {
      filteredUsers = filterData(filteredUsers, params.search, ["firstName", "lastName", "email"]);
    }
    
    const result = paginateData(filteredUsers, params?.page, params?.limit);
    
    return {
      success: true,
      message: "Users fetched successfully",
      ...result,
    };
  },

  getBookings: async (params?: PaginationParams): Promise<PaginatedResponse<Booking>> => {
    await delay();
    
    let filteredBookings = mockBookings;
    
    // Apply search filter
    if (params?.search) {
      filteredBookings = filterData(filteredBookings, params.search, ["bookingReference", "userName"]);
    }
    
    const result = paginateData(filteredBookings, params?.page, params?.limit);
    
    return {
      success: true,
      message: "Bookings fetched successfully",
      ...result,
    };
  },

  getOrganizations: async (params?: OrganizationFilters): Promise<PaginatedResponse<Organization>> => {
    await delay();
    
    let filteredOrgs = mockOrganizations;
    
    // Apply status filter
    if (params?.status) {
      filteredOrgs = filteredOrgs.filter((org) => org.status === params.status);
    }
    
    // Apply type filter
    if (params?.organizationType) {
      filteredOrgs = filteredOrgs.filter((org) => org.organizationType === params.organizationType);
    }
    
    // Apply deleted filter
    if (!params?.includeDeleted) {
      filteredOrgs = filteredOrgs.filter((org) => !org.deletedAt);
    }
    
    // Apply search filter
    if (params?.search) {
      filteredOrgs = filterData(filteredOrgs, params.search, ["name", "description"]);
    }
    
    const result = paginateData(filteredOrgs, params?.page, params?.limit);
    
    return {
      success: true,
      message: "Organizations fetched successfully",
      ...result,
    };
  },

  changeOrganizationStatus: async (
    organizationId: string,
    status: "pending_verification" | "verified" | "suspended" | "inactive"
  ): Promise<ApiResponse<Organization>> => {
    await delay();
    
    const org = mockOrganizations.find((o) => o.id === organizationId);
    
    if (!org) {
      throw new Error("Organization not found");
    }
    
    // Update the mock data
    org.status = status;
    org.verifiedAt = status === "verified" ? new Date().toISOString() : null;
    org.updatedAt = new Date().toISOString();
    
    return {
      success: true,
      message: "Organization status updated successfully",
      data: org,
    };
  },

  getPublishedVenues: async (params?: PaginationParams): Promise<PaginatedResponse<Venue>> => {
    await delay();
    
    let filteredVenues = mockVenues.filter((v) => v.isPublished);
    
    // Apply search filter
    if (params?.search) {
      filteredVenues = filterData(filteredVenues, params.search, ["name"]);
    }
    
    const result = paginateData(filteredVenues, params?.page, params?.limit);
    
    return {
      success: true,
      message: "Published venues fetched successfully",
      ...result,
    };
  },

  getPendingVerificationVenues: async (params?: PaginationParams): Promise<PaginatedResponse<Venue>> => {
    await delay();
    
    let filteredVenues = mockVenues.filter((v) => v.verificationStatus === "PENDING");
    
    // Apply search filter
    if (params?.search) {
      filteredVenues = filterData(filteredVenues, params.search, ["name"]);
    }
    
    const result = paginateData(filteredVenues, params?.page, params?.limit);
    
    return {
      success: true,
      message: "Pending verification venues fetched successfully",
      ...result,
    };
  },
};
