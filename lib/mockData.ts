import {
  Admin,
  DashboardMetrics,
  User,
  Booking,
  Organization,
  Venue,
} from "./types";

// Mock Admin Data
export const mockAdmin: Admin = {
  id: "admin-123",
  email: "admin@example.com",
  firstName: "John",
  lastName: "Doe",
  role: "admin",
  createdAt: "2024-01-01T00:00:00.000Z",
};

// Mock Dashboard Metrics
export const mockMetrics: DashboardMetrics = {
  userMetrics: {
    activeUsers24h: 45,
    activeUsers7d: 234,
    totalUsers: 1250,
  },
  organizationMetrics: {
    total: 89,
    verified: 67,
    pending: 15,
    suspended: 5,
    inactive: 2,
    deleted: 3,
    byType: {
      commercial: 45,
      educational: 44,
    },
  },
  bookingMetrics: {
    totalBookings: 567,
    totalRevenue: 125000,
    dateRange: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  },
};

// Mock Users
export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  firstName: ["John", "Jane", "Ahmed", "Sarah", "Ali", "Fatima"][i % 6],
  lastName: ["Doe", "Smith", "Khan", "Johnson", "Hassan", "Ahmed"][i % 6],
  email: `user${i + 1}@example.com`,
  phoneNumber: `+92300${String(i + 1).padStart(7, "0")}`,
  isEmailVerified: i % 3 !== 0,
  isPhoneVerified: i % 2 === 0,
  lastLoginAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
}));

// Mock Bookings
export const mockBookings: Booking[] = Array.from({ length: 40 }, (_, i) => ({
  id: `booking-${i + 1}`,
  bookingReference: `BK-2024-${String(i + 1).padStart(3, "0")}`,
  userId: `user-${i + 1}`,
  userName: ["John Doe", "Jane Smith", "Ahmed Khan", "Sarah Johnson"][i % 4],
  venueId: `venue-${(i % 10) + 1}`,
  venueName: ["Sports Arena", "Tennis Court", "Football Field", "Basketball Court", "Cricket Ground"][i % 5],
  startTime: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  endTime: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
  status: ["confirmed", "pending", "cancelled", "completed"][i % 4] as any,
  totalAmount: Math.floor(Math.random() * 10000) + 1000,
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}));

// Mock Organizations
export const mockOrganizations: Organization[] = Array.from({ length: 30 }, (_, i) => ({
  id: `org-${i + 1}`,
  name: [
    "Elite Sports Academy",
    "City Sports Complex",
    "University Sports Center",
    "Premium Fitness Club",
    "Community Sports Hub",
    "Professional Training Center",
  ][i % 6],
  slug: `org-slug-${i + 1}`,
  description: "Professional sports training facility with modern amenities",
  logoUrl: `https://via.placeholder.com/100?text=Org${i + 1}`,
  status: ["pending_verification", "verified", "suspended", "inactive"][i % 4] as any,
  organizationType: i % 2 === 0 ? "commercial" : "educational",
  email: `org${i + 1}@example.com`,
  phone: `+92300${String(i + 1).padStart(7, "0")}`,
  city: ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"][i % 5],
  province: ["Punjab", "Sindh", "Islamabad Capital Territory", "Punjab", "Punjab"][i % 5],
  country: "PK",
  verifiedAt: i % 4 === 1 ? new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString() : null,
  createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  deletedAt: i % 10 === 0 ? new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString() : null,
  owner: {
    id: `owner-${i + 1}`,
    firstName: ["Ahmed", "Sarah", "Ali", "Fatima", "Hassan"][i % 5],
    lastName: ["Khan", "Ahmed", "Hassan", "Ali", "Sheikh"][i % 5],
    email: `owner${i + 1}@example.com`,
  },
}));

// Mock Venues
export const mockVenues: Venue[] = Array.from({ length: 25 }, (_, i) => ({
  id: `venue-${i + 1}`,
  name: [
    "Sports Complex Arena",
    "Tennis Court A",
    "Football Field 1",
    "Basketball Court",
    "Cricket Ground",
    "Badminton Hall",
  ][i % 6],
  organizationId: `org-${(i % 10) + 1}`,
  organizationName: mockOrganizations[i % 10].name,
  city: ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"][i % 5],
  province: ["Punjab", "Sindh", "Islamabad Capital Territory", "Punjab", "Punjab"][i % 5],
  country: "PK",
  verificationStatus: i % 3 === 0 ? "PENDING" : "VERIFIED",
  isPublished: i % 3 !== 0,
  createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
}));

// Helper function to paginate data
export function paginateData<T>(data: T[], page: number = 1, limit: number = 20) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      totalItems: data.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < data.length,
      hasPreviousPage: page > 1,
    },
  };
}

// Helper function to filter and search data
export function filterData<T extends Record<string, any>>(
  data: T[],
  searchTerm?: string,
  searchFields?: (keyof T)[]
): T[] {
  if (!searchTerm || !searchFields) return data;

  const lowerSearch = searchTerm.toLowerCase();
  return data.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerSearch);
      }
      return false;
    })
  );
}
