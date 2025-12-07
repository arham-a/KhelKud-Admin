# 🎨 Poppins Font Usage Guide

## Font Weights & When to Use Them

### Light (300)
```tsx
<p className="font-light">
  Use for: Subtle text, captions, secondary information
</p>
```

### Regular (400) - Default
```tsx
<p className="font-normal">
  Use for: Body text, paragraphs, descriptions
</p>
```
**This is the default - no class needed!**

### Medium (500)
```tsx
<p className="font-medium">
  Use for: Labels, form fields, emphasized text
</p>
```

### Semi-Bold (600)
```tsx
<h3 className="font-semibold">
  Use for: Subheadings, card titles, section headers
</h3>
```

### Bold (700)
```tsx
<h1 className="font-bold">
  Use for: Main headings, page titles, important text
</h1>
```

---

## 📋 Recommended Usage by Component

### Page Titles
```tsx
<h1 className="text-2xl font-semibold text-gray-900">
  Dashboard Overview
</h1>
```

### Section Headers
```tsx
<h2 className="text-lg font-semibold text-gray-900">
  User Metrics
</h2>
```

### Card Titles
```tsx
<h3 className="text-base font-medium text-gray-900">
  Total Users
</h3>
```

### Body Text
```tsx
<p className="text-sm text-gray-600">
  Regular body text (font-normal is default)
</p>
```

### Labels
```tsx
<label className="text-sm font-medium text-gray-700">
  Email Address
</label>
```

### Buttons
```tsx
<button className="font-medium">
  Login
</button>
```

### Table Headers
```tsx
<th className="text-xs font-medium text-gray-500 uppercase">
  Name
</th>
```

### Badges
```tsx
<span className="text-xs font-medium">
  Verified
</span>
```

---

## 🎯 Current Implementation

All these are already using Poppins:

### Login Page
- ✅ "Admin Login" title - font-semibold
- ✅ Input labels - font-medium
- ✅ Button text - font-medium
- ✅ Error messages - font-normal

### Dashboard
- ✅ "Dashboard Overview" - font-semibold
- ✅ Metric card titles - font-normal
- ✅ Metric values - font-semibold
- ✅ Section headers - font-medium

### Tables
- ✅ Column headers - font-medium uppercase
- ✅ Table data - font-normal
- ✅ User names - font-medium

### Sidebar
- ✅ "Admin Dashboard" - font-semibold
- ✅ Menu items - font-medium

### Navbar
- ✅ Admin name - font-medium

---

## 💡 Pro Tips

### Combine with Text Sizes
```tsx
<h1 className="text-3xl font-bold">Large Bold Title</h1>
<h2 className="text-2xl font-semibold">Medium Semi-Bold</h2>
<h3 className="text-xl font-medium">Smaller Medium</h3>
<p className="text-base">Regular Body</p>
<small className="text-sm">Small Text</small>
<span className="text-xs">Extra Small</span>
```

### Combine with Colors
```tsx
<h1 className="font-bold text-gray-900">Dark Bold</h1>
<p className="font-medium text-gray-700">Medium Gray</p>
<span className="font-normal text-gray-600">Light Gray</span>
```

### Combine with Tracking
```tsx
<h1 className="font-semibold tracking-tight">Tight Tracking</h1>
<p className="font-normal tracking-normal">Normal Tracking</p>
<span className="font-medium tracking-wide">Wide Tracking</span>
```

---

## 🎨 Design System

### Headings
```tsx
// H1 - Page Title
<h1 className="text-2xl font-semibold text-gray-900">

// H2 - Section Title  
<h2 className="text-lg font-semibold text-gray-900">

// H3 - Subsection
<h3 className="text-base font-medium text-gray-900">
```

### Body Text
```tsx
// Large
<p className="text-base text-gray-700">

// Normal (most common)
<p className="text-sm text-gray-600">

// Small
<p className="text-xs text-gray-500">
```

### Interactive Elements
```tsx
// Buttons
<button className="font-medium">

// Links
<a className="font-medium text-blue-600">

// Inputs
<input className="font-normal">
```

---

## ✅ Verification

To verify Poppins is loaded:

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Font"
4. You should see Poppins font files loading
5. Or inspect any element and check computed font-family

---

## 🚀 Performance

Poppins is optimized by Next.js:
- ✅ Automatic subsetting
- ✅ Self-hosted
- ✅ Preloaded
- ✅ Cached
- ✅ No layout shift

---

**Your entire dashboard now has a consistent, professional look with Poppins!** 🎉
