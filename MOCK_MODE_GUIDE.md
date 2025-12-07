# 🎭 Mock Mode Guide

## ✅ Mock Mode is Now Active!

You can now test the entire admin dashboard **without needing backend access**!

---

## 🚀 How to Login (Mock Mode)

### Step 1: Open the Website
```
http://localhost:3000
```

### Step 2: Login Page
**Use ANY email and password!**

Examples:
```
Email: admin@example.com
Password: password123

OR

Email: test@test.com
Password: 123456

OR

Email: anything@anything.com
Password: anything
```

**All credentials work in mock mode!** ✨

### Step 3: 2FA Verification
**Enter ANY 6-digit code!**

Examples:
```
123456
000000
999999
111111
```

**All 6-digit codes work in mock mode!** ✨

### Step 4: You're In!
After entering the code, you'll be redirected to the dashboard with **sample data**!

---

## 📊 What Sample Data is Available?

### Dashboard Metrics
- ✅ 1,250 total users
- ✅ 45 active users (24h)
- ✅ 234 active users (7d)
- ✅ 89 total organizations
- ✅ 67 verified organizations
- ✅ 15 pending organizations
- ✅ 567 total bookings
- ✅ PKR 125,000 revenue

### Users Page
- ✅ 50 sample users
- ✅ Search functionality works
- ✅ Pagination works
- ✅ Verification badges

### Bookings Page
- ✅ 40 sample bookings
- ✅ Different statuses (pending, confirmed, cancelled, completed)
- ✅ Search functionality works
- ✅ Pagination works

### Organizations Page
- ✅ 30 sample organizations
- ✅ Different statuses (pending, verified, suspended, inactive)
- ✅ Commercial and educational types
- ✅ Search and filters work
- ✅ Status change works (updates mock data)

### Venues Page
- ✅ 25 sample venues
- ✅ Published and pending tabs
- ✅ Search functionality works
- ✅ Pagination works

### Profile Page
- ✅ Sample admin profile
- ✅ Name: John Doe
- ✅ Email: admin@example.com
- ✅ Role: admin

---

## 🔄 Switching Between Mock and Real API

### To Use Mock Data (Current Setting)
In `lib/config.ts`:
```typescript
export const USE_MOCK_API = true;
```

### To Use Real API
In `lib/config.ts`:
```typescript
export const USE_MOCK_API = false;
```

Then you'll need:
- Real backend credentials
- Access to 2FA email

---

## ✨ Features That Work in Mock Mode

### ✅ Fully Functional
- Login (any credentials)
- 2FA verification (any 6-digit code)
- Dashboard metrics display
- Users list with search and pagination
- Bookings list with search and pagination
- Organizations list with filters and search
- **Organization status changes** (updates mock data)
- Venues list with tabs
- Profile display
- Logout

### 🔄 Simulated
- API delays (500ms) for realistic feel
- Loading states
- Error handling
- Pagination
- Search filtering
- Status filtering

---

## 🎯 Quick Test Flow

1. **Open**: http://localhost:3000
2. **Login**: 
   - Email: `admin@test.com`
   - Password: `test123`
3. **2FA**: Enter `123456`
4. **Explore**:
   - Dashboard → See metrics
   - Users → Search for "John"
   - Bookings → See booking list
   - Organizations → Change status of an org
   - Venues → Switch between tabs
   - Profile → See admin info

---

## 🛠️ Customizing Mock Data

### Add More Users
Edit `lib/mockData.ts`:
```typescript
export const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  // ... increase from 50 to 100
}));
```

### Change Admin Info
Edit `lib/mockData.ts`:
```typescript
export const mockAdmin: Admin = {
  id: "admin-123",
  email: "your-email@example.com",
  firstName: "Your",
  lastName: "Name",
  role: "admin",
  createdAt: "2024-01-01T00:00:00.000Z",
};
```

### Modify Metrics
Edit `lib/mockData.ts`:
```typescript
export const mockMetrics: DashboardMetrics = {
  userMetrics: {
    activeUsers24h: 100, // Change values
    activeUsers7d: 500,
    totalUsers: 2000,
  },
  // ...
};
```

---

## 🔐 Mock Authentication Details

### How It Works
1. Login accepts any email/password
2. Stores email in localStorage
3. 2FA accepts any 6-digit code
4. Stores mock tokens in localStorage:
   - `mockAccessToken`
   - `mockRefreshToken`
5. All API calls return mock data
6. Logout clears mock tokens

### Mock Tokens
Check browser console → Application → Local Storage:
```
mockAccessToken: "mock-access-token"
mockRefreshToken: "mock-refresh-token"
adminEmail: "your-email@example.com"
```

---

## 📝 Development Workflow

### Phase 1: UI Development (Current - Mock Mode)
✅ Test all pages
✅ Verify UI components
✅ Test search and filters
✅ Test pagination
✅ Test status changes
✅ Perfect the design

### Phase 2: Backend Integration (Later)
1. Set `USE_MOCK_API = false` in `lib/config.ts`
2. Get real admin credentials from backend team
3. Test with real API
4. Fix any integration issues
5. Deploy!

---

## 🐛 Troubleshooting Mock Mode

### Can't Login
- Make sure you entered SOMETHING in email and password
- Any values work, just don't leave them empty

### 2FA Not Working
- Make sure you entered exactly 6 digits
- Examples: `123456`, `000000`, `999999`

### No Data Showing
- Check browser console for errors
- Make sure `USE_MOCK_API = true` in `lib/config.ts`
- Refresh the page

### Want to Reset
1. Clear localStorage: Browser DevTools → Application → Local Storage → Clear All
2. Refresh page
3. Login again

---

## 🎉 Benefits of Mock Mode

✅ **No Backend Needed** - Develop UI independently
✅ **Fast Development** - No API delays or network issues
✅ **Predictable Data** - Same data every time
✅ **Offline Work** - No internet required
✅ **Easy Testing** - Test all scenarios easily
✅ **No Rate Limits** - Make unlimited requests
✅ **No 2FA Emails** - No waiting for codes

---

## 📚 Files to Know

- `lib/config.ts` - Toggle mock mode on/off
- `lib/mockData.ts` - All sample data
- `lib/mockApi.ts` - Mock API implementations
- `lib/api.ts` - Switches between mock and real API

---

## 🚀 Ready to Test!

**Your dashboard is ready with mock data!**

1. Open http://localhost:3000
2. Login with any credentials
3. Enter any 6-digit code
4. Explore the dashboard!

**No backend needed!** 🎉

---

**When ready for real integration:**
- Change `USE_MOCK_API` to `false`
- Get real credentials from backend team
- Everything will work the same way!
