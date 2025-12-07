# 🎨 Theme Colors Quick Reference

## Your Color Scheme

### 🟢 Primary Green (#02a145)
**Use for:**
- ✅ Success states
- ✅ Verified badges
- ✅ Primary buttons
- ✅ Active navigation
- ✅ Positive actions
- ✅ Focus rings

**Examples:**
```tsx
className="bg-primary"           // Solid green
className="text-primary"         // Green text
className="border-primary"       // Green border
className="bg-primary/10"        // 10% opacity green
className="hover:bg-primary-600" // Darker on hover
```

---

### 🔵 Secondary Blue (#020ba9)
**Use for:**
- ℹ️ Info states
- ℹ️ Secondary buttons
- ℹ️ Completed states
- ℹ️ Alternative actions
- ℹ️ Secondary metrics

**Examples:**
```tsx
className="bg-secondary"           // Solid blue
className="text-secondary"         // Blue text
className="border-secondary"       // Blue border
className="bg-secondary/10"        // 10% opacity blue
className="hover:bg-secondary-600" // Darker on hover
```

---

### ⚫ Black (#000000)
**Use for:**
- 🌑 Main backgrounds
- 🌑 Input backgrounds
- 🌑 Table headers
- 🌑 Deep contrast

**Examples:**
```tsx
className="bg-black"      // Pure black
className="bg-dark-50"    // Slightly lighter (#1a1a1a)
className="bg-dark-100"   // Even lighter (#0d0d0d)
```

---

### 🔴 Red (Danger)
**Use for:**
- ❌ Errors
- ❌ Suspended states
- ❌ Cancelled bookings
- ❌ Delete actions

**Examples:**
```tsx
className="bg-red-500/10 text-red-400 border-red-500/20"
```

---

### 🟡 Yellow (Warning)
**Use for:**
- ⚠️ Warnings
- ⚠️ Pending states
- ⚠️ Caution messages

**Examples:**
```tsx
className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
```

---

### ⚪ Gray (Neutral)
**Use for:**
- 🔘 Inactive states
- 🔘 Disabled elements
- 🔘 Secondary text
- 🔘 Borders

**Examples:**
```tsx
className="text-gray-300"    // Light gray text
className="text-gray-400"    // Medium gray text
className="text-gray-500"    // Darker gray text
className="border-gray-700"  // Gray borders
className="border-gray-800"  // Darker borders
```

---

## 🎯 Common Patterns

### Card
```tsx
className="bg-dark-50 rounded-lg shadow-lg border border-gray-800"
```

### Button Primary
```tsx
className="bg-primary text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/20"
```

### Button Secondary
```tsx
className="bg-secondary text-white hover:bg-secondary-600 hover:shadow-lg hover:shadow-secondary/20"
```

### Input
```tsx
className="bg-dark-50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary"
```

### Table Header
```tsx
className="bg-black border-b border-gray-800 text-gray-400"
```

### Table Row
```tsx
className="hover:bg-gray-800/50 transition-colors"
```

### Badge Success
```tsx
className="bg-primary/10 text-primary border border-primary/20"
```

### Badge Warning
```tsx
className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
```

### Badge Danger
```tsx
className="bg-red-500/10 text-red-400 border border-red-500/20"
```

---

## 🌈 Gradient Examples

### Primary to Secondary
```tsx
className="bg-gradient-to-br from-primary to-secondary"
```

### Dark Gradient
```tsx
className="bg-gradient-to-br from-gray-900 to-black"
```

---

## ✨ Glow Effects

### Primary Glow
```tsx
className="shadow-lg shadow-primary/20"
```

### Secondary Glow
```tsx
className="shadow-lg shadow-secondary/20"
```

---

## 📊 Opacity Levels

### 10% - Subtle background
```tsx
className="bg-primary/10"
```

### 20% - Border/outline
```tsx
className="border-primary/20"
```

### 30% - Hover state
```tsx
className="hover:bg-primary/30"
```

### 50% - Semi-transparent
```tsx
className="bg-gray-800/50"
```

---

## 🎨 Text Colors

### White (Primary text)
```tsx
className="text-white"
```

### Gray-300 (Secondary text)
```tsx
className="text-gray-300"
```

### Gray-400 (Tertiary text)
```tsx
className="text-gray-400"
```

### Gray-500 (Muted text)
```tsx
className="text-gray-500"
```

### Primary (Accent text)
```tsx
className="text-primary"
```

### Secondary (Accent text)
```tsx
className="text-secondary"
```

---

## 🔍 Border Colors

### Gray-700 (Default borders)
```tsx
className="border-gray-700"
```

### Gray-800 (Darker borders)
```tsx
className="border-gray-800"
```

### Primary (Accent borders)
```tsx
className="border-primary"
```

### With opacity
```tsx
className="border-primary/20"
```

---

## 💡 Pro Tips

1. **Use opacity** for subtle effects: `/10`, `/20`, `/30`
2. **Combine colors** for depth: `bg-dark-50 border-gray-800`
3. **Add glow** for emphasis: `shadow-lg shadow-primary/20`
4. **Smooth transitions**: `transition-colors duration-200`
5. **Hover effects**: `hover:bg-gray-800/50`

---

**Your theme is consistent, professional, and beautiful!** 🎨✨
