# Admin Dashboard API Documentation

## Base URL
```
https://khel-kud.onrender.com/api/v1
```

## Authentication Flow

### 1. Admin Login
**Endpoint:** `POST /auth/admin/login`

**Description:** Initial login step. If credentials are correct, a 2FA code will be sent to the admin's email.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "2FA code sent to your email",
  "data": {
    "requiresVerification": true,
    "email": "admin@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Frontend Action:** Navigate user to 2FA verification page

---

### 2. Verify 2FA
**Endpoint:** `POST /auth/admin/verify-2fa`

**Description:** Verify the 2FA code sent to admin's email. This is required for every login.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "code": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "uuid",
      "email": "admin@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or expired 2FA code"
}
```

**Frontend Action:** 
- access token and refresh token will be set in httpOnlyCookie
- enable with credentials = true
- Navigate to dashboard


---

## Dashboard Endpoints

### 1. Get Admin Profile
**Endpoint:** `GET /admin/profile`

**Description:** Get current admin's profile information



**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin profile retrieved successfully",
  "data": {
    "id": "uuid",
    "email": "admin@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 2. Get Dashboard Metrics
**Endpoint:** `GET /admin/metrics`

**Description:** Get comprehensive dashboard metrics and statistics

**Query Parameters (Optional):**
- `startDate` (string): Start date for booking/revenue metrics (ISO 8601 format)
- `endDate` (string): End date for booking/revenue metrics (ISO 8601 format)
- `dateRange` (string): Predefined range like "7d", "30d", "90d"

**Example Request:**
```
GET /admin/metrics?startDate=2024-01-01&endDate=2024-12-31
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Dashboard Metrics Fetched Successfully",
  "data": {
    "userMetrics": {
      "activeUsers24h": 45,
      "activeUsers7d": 234,
      "totalUsers": 1250
    },
    "organizationMetrics": {
      "total": 89,
      "verified": 67,
      "pending": 15,
      "suspended": 5,
      "inactive": 2,
      "deleted": 3,
      "byType": {
        "commercial": 45,
        "educational": 44
      }
    },
    "bookingMetrics": {
      "totalBookings": 567,
      "totalRevenue": 125000,
      "dateRange": {
        "startDate": "2024-01-01",
        "endDate": "2024-12-31"
      }
    }
  }
}
```

**Frontend Display:**
- Create metric cards for each category
- Show user activity trends
- Display organization status breakdown (pie/donut chart)
- Show organization type distribution
- Display booking and revenue statistics

---

### 3. Get All Users
**Endpoint:** `GET /admin/users`

**Description:** Get all users with pagination and search



**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `search` (string, optional): Search by name or email
- `sortBy` (string, optional): Field to sort by
- `sortOrder` (string, optional): "ASC" or "DESC" (default: "DESC")

**Example Request:**
```
GET /admin/users?page=1&limit=20&search=john
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phoneNumber": "+923001234567",
      "isEmailVerified": true,
      "isPhoneVerified": true,
      "lastLoginAt": "2024-12-14T10:30:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 63,
    "totalItems": 1250,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

**Frontend Features:**
- Data table with pagination
- Search bar for filtering
- Sort by columns
- Display user verification status badges

---


### 4. Get All Bookings
**Endpoint:** `GET /admin/bookings`

**Description:** Get all bookings with pagination and search

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `search` (string, optional): Search by booking reference or user name
- `sortBy` (string, optional): Field to sort by
- `sortOrder` (string, optional): "ASC" or "DESC" (default: "DESC")

**Example Request:**
```
GET /admin/bookings?page=1&limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Bookings fetched successfully",
  "data": [
    {
      "id": "uuid",
      "bookingReference": "BK-2024-001",
      "userId": "uuid",
      "userName": "John Doe",
      "venueId": "uuid",
      "venueName": "Sports Arena",
      "startTime": "2024-12-20T10:00:00.000Z",
      "endTime": "2024-12-20T12:00:00.000Z",
      "status": "confirmed",
      "totalAmount": 5000,
      "createdAt": "2024-12-14T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 29,
    "totalItems": 567,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

**Frontend Features:**
- Data table with booking details
- Status badges (confirmed, pending, cancelled, completed)
- Filter by status
- Date range picker

---

### 5. Get All Organizations
**Endpoint:** `GET /admin/organizations`

**Description:** Get all organizations with advanced filtering

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `search` (string, optional): Search by organization name or description
- `status` (string, optional): Filter by status - "pending_verification" (default), "verified", "suspended", "inactive"
- `organizationType` (string, optional): Filter by type - "commercial" or "educational"
- `includeDeleted` (boolean, optional): Include soft-deleted organizations (default: false)
- `sortBy` (string, optional): Field to sort by (default: "createdAt")
- `sortOrder` (string, optional): "ASC" or "DESC" (default: "DESC")

**Example Requests:**
```
GET /admin/organizations?page=1&limit=20&status=pending_verification
GET /admin/organizations?status=verified&organizationType=educational
GET /admin/organizations?includeDeleted=true
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Organizations fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Elite Sports Academy",
      "slug": "elite-sports-academy",
      "description": "Professional sports training facility",
      "logoUrl": "https://cdn.example.com/logos/elite-sports.jpg",
      "status": "pending_verification",
      "organizationType": "commercial",
      "email": "info@elitesports.com",
      "phone": "+923001234567",
      "city": "Lahore",
      "province": "Punjab",
      "country": "PK",
      "verifiedAt": null,
      "createdAt": "2024-12-01T00:00:00.000Z",
      "updatedAt": "2024-12-14T10:30:00.000Z",
      "deletedAt": null,
      "owner": {
        "id": "uuid",
        "firstName": "Ahmed",
        "lastName": "Khan",
        "email": "ahmed@example.com"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 89,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

**Frontend Features:**
- Data table with organization details
- Status filter dropdown (pending_verification, verified, suspended, inactive)
- Type filter (commercial, educational)
- Toggle to show deleted organizations
- Status badge with color coding:
  - `pending_verification`: Yellow/Warning
  - `verified`: Green/Success
  - `suspended`: Red/Danger
  - `inactive`: Gray/Secondary
- Action button to change status (opens modal/dropdown)

---

### 6. Change Organization Status
**Endpoint:** `PATCH /admin/organizations/:id/status`

**Description:** Change the status of an organization

**Headers:**
```
Authorization: Bearer <accessToken>
```

**URL Parameters:**
- `id` (string, required): Organization UUID

**Request Body:**
```json
{
  "status": "verified"
}
```

**Valid Status Values:**
- `"pending_verification"` - Organization awaiting approval
- `"verified"` - Organization approved and active
- `"suspended"` - Organization temporarily suspended
- `"inactive"` - Organization deactivated

**Example Request:**
```
PATCH /admin/organizations/123e4567-e89b-12d3-a456-426614174000/status
Content-Type: application/json

{
  "status": "verified"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Organization status updated successfully",
  "data": {
    "id": "uuid",
    "name": "Elite Sports Academy",
    "status": "verified",
    "verifiedAt": "2024-12-14T10:30:00.000Z",
    "updatedAt": "2024-12-14T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Organization not found"
}
```

**Frontend Implementation:**
```javascript
// Example: Status change dropdown/modal
const handleStatusChange = async (organizationId, newStatus) => {
  try {
    const response = await fetch(`/admin/organizations/${organizationId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show success message
      // Refresh organization list
      toast.success('Organization status updated successfully');
      fetchOrganizations();
    }
  } catch (error) {
    toast.error('Failed to update organization status');
  }
};
```

---

### 7. Get Published Venues
**Endpoint:** `GET /admin/venues/published`

**Description:** Get all published venues

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `search` (string, optional): Search by venue name
- `sortBy` (string, optional): Field to sort by
- `sortOrder` (string, optional): "ASC" or "DESC" (default: "DESC")

**Example Request:**
```
GET /admin/venues/published?page=1&limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Published venues fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Sports Complex Arena",
      "organizationId": "uuid",
      "organizationName": "Elite Sports Management",
      "city": "Lahore",
      "province": "Punjab",
      "country": "PK",
      "verificationStatus": "VERIFIED",
      "isPublished": true,
      "createdAt": "2024-12-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 89,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

### 8. Get Pending Verification Venues
**Endpoint:** `GET /admin/venues/pending-verification`

**Description:** Get venues pending verification

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:** Same as `/admin/venues/published`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Pending verification venues fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "New Sports Arena",
      "organizationId": "uuid",
      "organizationName": "Sports Hub",
      "city": "Karachi",
      "province": "Sindh",
      "country": "PK",
      "verificationStatus": "PENDING",
      "isPublished": false,
      "createdAt": "2024-12-14T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 12,
    "itemsPerPage": 20,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

**Frontend Implementation:**
- Create a single "Venues" page with tabs or filter toggle
- Tab 1: "Published" (calls `/admin/venues/published`)
- Tab 2: "Pending Verification" (calls `/admin/venues/pending-verification`)
- Or use a single filter dropdown to switch between the two

---

## Dashboard Layout Structure

### Recommended Page Structure:

```
Admin Dashboard
├── Login Page (/auth/admin/login)
├── 2FA Verification Page (/auth/admin/verify-2fa)
└── Dashboard (Protected Routes)
    ├── Overview/Metrics (/admin/dashboard)
    │   ├── User Metrics Cards
    │   ├── Organization Metrics Cards
    │   └── Booking/Revenue Metrics Cards
    │
    ├── Users Tab (/admin/dashboard/users)
    │   ├── All Users (default)
    │   ├── Active 24h (filter)
    │   └── Active 7d (filter)
    │
    ├── Bookings Tab (/admin/dashboard/bookings)
    │   └── All Bookings with filters
    │
    ├── Organizations Tab (/admin/dashboard/organizations)
    │   ├── Filter by status (pending/verified/suspended/inactive)
    │   ├── Filter by type (commercial/educational)
    │   ├── Toggle deleted organizations
    │   └── Status change action (modal/dropdown)
    │
    ├── Venues Tab (/admin/dashboard/venues)
    │   ├── Published (default)
    │   └── Pending Verification (toggle/tab)
    │
    └── Profile (/admin/profile)
        └── Admin profile information
```

---

## Status Enums Reference

### Organization Status:
- `pending_verification` - Awaiting admin approval (default filter)
- `verified` - Approved and active
- `suspended` - Temporarily suspended
- `inactive` - Deactivated

### Organization Type:
- `commercial` - Business/commercial organizations
- `educational` - Educational institutions

### Venue Verification Status:
- `PENDING` - Awaiting verification
- `VERIFIED` - Verified and approved
- `REJECTED` - Rejected

### Booking Status:
- `pending` - Booking pending confirmation
- `confirmed` - Booking confirmed
- `cancelled` - Booking cancelled
- `completed` - Booking completed

---

## Error Handling

All endpoints may return the following error responses:

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Unauthorized access",
  "statusCode": 401
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Insufficient permissions",
  "statusCode": 403
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found",
  "statusCode": 404
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error",
  "statusCode": 500
}
```

---

## Frontend Implementation Notes

### Authentication Flow:
1. User enters credentials on login page
2. Call `POST /auth/admin/login`
3. If successful, navigate to 2FA page
4. User enters 2FA code
5. Call `POST /auth/admin/verify-2fa`
6. Store access token
7. Navigate to dashboard

### Token Management:
- Store token in localStorage or secure cookie
- Add token to all API requests in Authorization header
- Implement token refresh logic
- Handle 401 errors by redirecting to login

### Organization Status Management:
- Display current status with color-coded badge
- Provide dropdown/modal to change status
- Show confirmation dialog before changing status
- Refresh list after successful status change
- Show loading state during API call

### Pagination:
- Use pagination component for all list views
- Show page numbers and navigation buttons
- Display total items count
- Allow changing items per page

### Search & Filters:
- Implement debounced search (300-500ms delay)
- Clear filters button
- Show active filters as chips/tags
- Persist filters in URL query params

### Data Tables:
- Sortable columns
- Responsive design
- Row actions (view, edit, delete)
- Bulk actions (if needed)
- Export functionality (optional)

---

## Sample Frontend Code Snippets

### API Service Setup:

```javascript
// api/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = 'https://khel-kud.onrender.com/api/v1';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enable sending cookies with requests (IMPORTANT!)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional - for adding custom headers or logging)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom logic here if needed
    console.log('Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      // Clear any local storage if needed
      localStorage.removeItem('adminEmail');
      // Redirect to login page
      window.location.href = '/auth/admin/login';
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

```javascript
// api/adminAPI.js
import axiosInstance from './axiosConfig';

export const adminAPI = {
  // ==================== AUTH ====================
  
  /**
   * Admin login - sends 2FA code to email
   * @param {string} email - Admin email
   * @param {string} password - Admin password
   */
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/admin/login', {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Verify 2FA code
   * @param {string} email - Admin email
   * @param {string} code - 2FA code from email
   */
  verify2FA: async (email, code) => {
    const response = await axiosInstance.post('/auth/admin/verify-2fa', {
      email,
      code,
    });
    return response.data;
  },

  /**
   * Logout admin (optional - if you have logout endpoint)
   */
  logout: async () => {
    const response = await axiosInstance.post('/auth/admin/logout');
    return response.data;
  },

  // ==================== DASHBOARD ====================

  /**
   * Get admin profile
   */
  getProfile: async () => {
    const response = await axiosInstance.get('/admin/profile');
    return response.data;
  },

  /**
   * Get dashboard metrics
   * @param {Object} params - Query parameters
   * @param {string} params.startDate - Start date (ISO 8601)
   * @param {string} params.endDate - End date (ISO 8601)
   * @param {string} params.dateRange - Predefined range (7d, 30d, 90d)
   */
  getMetrics: async (params = {}) => {
    const response = await axiosInstance.get('/admin/metrics', { params });
    return response.data;
  },

  // ==================== USERS ====================

  /**
   * Get all users with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.search - Search term
   * @param {string} params.sortBy - Sort field
   * @param {string} params.sortOrder - Sort order (ASC/DESC)
   */
  getUsers: async (params = {}) => {
    const response = await axiosInstance.get('/admin/users', { params });
    return response.data;
  },

  /**
   * Get active users in last 24 hours
   */
  getActiveUsers24h: async (params = {}) => {
    const response = await axiosInstance.get('/admin/users/active-24h', { params });
    return response.data;
  },

  /**
   * Get active users in last 7 days
   */
  getActiveUsers7d: async (params = {}) => {
    const response = await axiosInstance.get('/admin/users/active-7d', { params });
    return response.data;
  },

  // ==================== BOOKINGS ====================

  /**
   * Get all bookings with pagination
   * @param {Object} params - Query parameters
   */
  getBookings: async (params = {}) => {
    const response = await axiosInstance.get('/admin/bookings', { params });
    return response.data;
  },

  // ==================== ORGANIZATIONS ====================

  /**
   * Get all organizations with filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.search - Search term
   * @param {string} params.status - Filter by status
   * @param {string} params.organizationType - Filter by type
   * @param {boolean} params.includeDeleted - Include deleted organizations
   * @param {string} params.sortBy - Sort field
   * @param {string} params.sortOrder - Sort order (ASC/DESC)
   */
  getOrganizations: async (params = {}) => {
    const response = await axiosInstance.get('/admin/organizations', { params });
    return response.data;
  },

  /**
   * Change organization status
   * @param {string} organizationId - Organization UUID
   * @param {string} status - New status (pending_verification, verified, suspended, inactive)
   */
  changeOrganizationStatus: async (organizationId, status) => {
    const response = await axiosInstance.patch(
      `/admin/organizations/${organizationId}/status`,
      { status }
    );
    return response.data;
  },

  // ==================== VENUES ====================

  /**
   * Get published venues
   * @param {Object} params - Query parameters
   */
  getPublishedVenues: async (params = {}) => {
    const response = await axiosInstance.get('/admin/venues/published', { params });
    return response.data;
  },

  /**
   * Get pending verification venues
   * @param {Object} params - Query parameters
   */
  getPendingVerificationVenues: async (params = {}) => {
    const response = await axiosInstance.get('/admin/venues/pending-verification', { params });
    return response.data;
  },
};

export default adminAPI;
```

---

### Usage Examples:

#### Example 1: Login Flow Component

```javascript
// pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api/adminAPI';
import { toast } from 'react-toastify'; // or your preferred toast library

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await adminAPI.login(email, password);
      
      if (result.success) {
        // Store email for 2FA step
        localStorage.setItem('adminEmail', email);
        // Navigate to 2FA page
        navigate('/auth/admin/verify-2fa');
        toast.success(result.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
```

#### Example 2: 2FA Verification Component

```javascript
// pages/Verify2FAPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api/adminAPI';
import { toast } from 'react-toastify';

const Verify2FAPage = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('adminEmail');
    if (!storedEmail) {
      // Redirect back to login if no email found
      navigate('/auth/admin/login');
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await adminAPI.verify2FA(email, code);
      
      if (result.success) {
        // Cookies are automatically set by the server (httpOnly)
        // Clear temporary email storage
        localStorage.removeItem('adminEmail');
        // Navigate to dashboard
        navigate('/admin/dashboard');
        toast.success('Login successful');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Verification failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-2fa-container">
      <h1>Verify 2FA Code</h1>
      <p>A verification code has been sent to {email}</p>
      <form onSubmit={handleVerify}>
        <div className="form-group">
          <label>Enter 6-digit code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="123456"
            maxLength={6}
            required
          />
        </div>
        <button type="submit" disabled={loading || code.length !== 6}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default Verify2FAPage;
```

#### Example 3: Dashboard Metrics Component

```javascript
// pages/DashboardMetrics.jsx
import { useEffect, useState } from 'react';
import { adminAPI } from '../api/adminAPI';
import { toast } from 'react-toastify';

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    fetchMetrics();
  }, [dateRange]);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const result = await adminAPI.getMetrics({ dateRange });
      
      if (result.success) {
        setMetrics(result.data);
      }
    } catch (error) {
      toast.error('Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading metrics...</div>;
  if (!metrics) return null;

  return (
    <div className="dashboard-metrics">
      <div className="metrics-header">
        <h2>Dashboard Overview</h2>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* User Metrics */}
      <div className="metrics-section">
        <h3>User Metrics</h3>
        <div className="metrics-grid">
          <MetricCard
            title="Total Users"
            value={metrics.userMetrics.totalUsers}
            icon="👥"
            color="blue"
          />
          <MetricCard
            title="Active (24h)"
            value={metrics.userMetrics.activeUsers24h}
            icon="⚡"
            color="green"
          />
          <MetricCard
            title="Active (7d)"
            value={metrics.userMetrics.activeUsers7d}
            icon="📊"
            color="purple"
          />
        </div>
      </div>

      {/* Organization Metrics */}
      <div className="metrics-section">
        <h3>Organization Metrics</h3>
        <div className="metrics-grid">
          <MetricCard
            title="Total Organizations"
            value={metrics.organizationMetrics.total}
            icon="🏢"
            color="blue"
          />
          <MetricCard
            title="Verified"
            value={metrics.organizationMetrics.verified}
            icon="✅"
            color="green"
          />
          <MetricCard
            title="Pending"
            value={metrics.organizationMetrics.pending}
            icon="⏳"
            color="yellow"
          />
          <MetricCard
            title="Suspended"
            value={metrics.organizationMetrics.suspended}
            icon="⛔"
            color="red"
          />
        </div>
        
        {/* Organization Type Breakdown */}
        <div className="type-breakdown">
          <h4>By Type</h4>
          <div className="type-stats">
            <div className="type-stat">
              <span>Commercial:</span>
              <strong>{metrics.organizationMetrics.byType.commercial}</strong>
            </div>
            <div className="type-stat">
              <span>Educational:</span>
              <strong>{metrics.organizationMetrics.byType.educational}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Metrics */}
      <div className="metrics-section">
        <h3>Booking & Revenue</h3>
        <div className="metrics-grid">
          <MetricCard
            title="Total Bookings"
            value={metrics.bookingMetrics.totalBookings}
            icon="📅"
            color="blue"
          />
          <MetricCard
            title="Total Revenue"
            value={`PKR ${metrics.bookingMetrics.totalRevenue.toLocaleString()}`}
            icon="💰"
            color="green"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Metric Card Component
const MetricCard = ({ title, value, icon, color }) => (
  <div className={`metric-card metric-card-${color}`}>
    <div className="metric-icon">{icon}</div>
    <div className="metric-content">
      <h4>{title}</h4>
      <p className="metric-value">{value}</p>
    </div>
  </div>
);

export default DashboardMetrics;
```

#### Example 4: Organizations Table with Status Management

```javascript
// pages/OrganizationsPage.jsx
import { useState, useEffect } from 'react';
import { adminAPI } from '../api/adminAPI';
import { toast } from 'react-toastify';

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    status: 'pending_verification',
    organizationType: '',
    search: '',
    includeDeleted: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrganizations();
  }, [filters]);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      // Remove empty filters
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      
      const result = await adminAPI.getOrganizations(cleanFilters);
      
      if (result.success) {
        setOrganizations(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      toast.error('Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (organizationId, newStatus) => {
    if (!window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)) {
      return;
    }

    try {
      const result = await adminAPI.changeOrganizationStatus(organizationId, newStatus);
      
      if (result.success) {
        toast.success('Organization status updated successfully');
        // Refresh the list
        fetchOrganizations();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update status';
      toast.error(errorMessage);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="organizations-page">
      <h1>Organizations Management</h1>

      {/* Filters */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search organizations..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />
        
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="pending_verification">Pending Verification</option>
          <option value="verified">Verified</option>
          <option value="suspended">Suspended</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={filters.organizationType}
          onChange={(e) => handleFilterChange('organizationType', e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="commercial">Commercial</option>
          <option value="educational">Educational</option>
        </select>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={filters.includeDeleted}
            onChange={(e) => handleFilterChange('includeDeleted', e.target.checked)}
          />
          Include Deleted
        </label>
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading">Loading organizations...</div>
      ) : (
        <>
          <div className="table-container">
            <table className="organizations-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Location</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No organizations found
                    </td>
                  </tr>
                ) : (
                  organizations.map((org) => (
                    <tr key={org.id}>
                      <td>
                        <div className="org-name">
                          {org.logoUrl && (
                            <img src={org.logoUrl} alt={org.name} className="org-logo" />
                          )}
                          <span>{org.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`type-badge type-${org.organizationType}`}>
                          {org.organizationType}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={org.status} />
                      </td>
                      <td>
                        {org.owner.firstName} {org.owner.lastName}
                        <br />
                        <small>{org.owner.email}</small>
                      </td>
                      <td>
                        {org.city}, {org.province}
                      </td>
                      <td>{new Date(org.createdAt).toLocaleDateString()}</td>
                      <td>
                        <StatusDropdown
                          currentStatus={org.status}
                          organizationId={org.id}
                          onStatusChange={handleStatusChange}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending_verification: { label: 'Pending', color: 'warning' },
    verified: { label: 'Verified', color: 'success' },
    suspended: { label: 'Suspended', color: 'danger' },
    inactive: { label: 'Inactive', color: 'secondary' },
  };

  const config = statusConfig[status] || { label: status, color: 'default' };

  return (
    <span className={`status-badge status-${config.color}`}>
      {config.label}
    </span>
  );
};

// Status Dropdown Component
const StatusDropdown = ({ currentStatus, organizationId, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: 'verified', label: 'Verify', icon: '✅' },
    { value: 'suspended', label: 'Suspend', icon: '⛔' },
    { value: 'inactive', label: 'Deactivate', icon: '🚫' },
    { value: 'pending_verification', label: 'Set Pending', icon: '⏳' },
  ];

  const handleStatusClick = (newStatus) => {
    setIsOpen(false);
    if (newStatus !== currentStatus) {
      onStatusChange(organizationId, newStatus);
    }
  };

  return (
    <div className="status-dropdown">
      <button
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Change Status ▼
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {statusOptions
            .filter((option) => option.value !== currentStatus)
            .map((option) => (
              <button
                key={option.value}
                className="dropdown-item"
                onClick={() => handleStatusClick(option.value)}
              >
                <span className="dropdown-icon">{option.icon}</span>
                {option.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  const pages = [];
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing page {currentPage} of {totalPages} ({totalItems} total items)
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        
        {startPage > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className="pagination-btn">
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button onClick={() => onPageChange(totalPages)} className="pagination-btn">
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrganizationsPage;
```

---

## Important Notes for Frontend Team

### 1. Axios Configuration
- **CRITICAL:** Always set `withCredentials: true` in axios config
- This enables sending httpOnly cookies with every request
- The access token is stored in httpOnly cookies by the backend
- No need to manually manage tokens in localStorage

### 2. CORS Configuration
Make sure your frontend app is configured to send credentials:
```javascript
// If using fetch API directly
fetch(url, {
  credentials: 'include', // Important!
  // ... other options
});

// Axios (already configured in axiosConfig.js)
axios.create({
  withCredentials: true, // Important!
});
```

### 3. Error Handling
- 401 errors automatically redirect to login (configured in interceptor)
- Always show user-friendly error messages
- Use try-catch blocks for all API calls

### 4. Security Best Practices
- Never store sensitive data in localStorage
- Tokens are in httpOnly cookies (cannot be accessed by JavaScript)
- Always validate user input before sending to API
- Implement CSRF protection if needed

---

## Testing the API

### Using Postman/Thunder Client:
1. Make sure to enable "Send cookies" in request settings
2. After login + 2FA, cookies will be automatically stored
3. Subsequent requests will include the cookies automatically

### Using Browser DevTools:
1. Open Network tab
2. Check "Preserve log"
3. Monitor requests to see cookies being sent
4. Check Application > Cookies to see stored cookies

---

## Support & Questions

For any questions or clarifications about the API, please contact the backend team.

**Last Updated:** December 2024  
**API Version:** 1.0  
**Base URL:** https://khel-kud.onrender.com/api/v1
