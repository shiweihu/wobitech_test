# 📍 Interactive Map & Geolocation Manager

A modern, responsive web application built with **Next.js 15** that allows users to interactively manage location pins on a map with real-time reverse geocoding.

---

## 🚀 Live Demo
**URL**: [https://wobitechtest.vercel.app/](https://wobitechtest.vercel.app/)


[![Wobitech Project Demo](https://img.youtube.com/vi/8Xr1KR2JTkc/0.jpg)](https://www.youtube.com/watch?v=8Xr1KR2JTkc)

## 📌 Project Overview
The goal of this project is to provide a seamless interface for geographic data management. Users can place markers, drag them to adjust positions, and see human-readable addresses instantly.

### **Core User Experience**
1. **Click to Pin**: Tap anywhere on the map to drop a marker.
2. **Auto-Geocoding**: The app automatically fetches the street address via OpenStreetMap.
3. **Draggable Interaction**: Markers can be moved, triggering an automatic address update.
4. **Synced Sidebar**: A responsive list displays all pins with formatted coordinates and status indicators.

---

## ✅ Feature Checklist

| Category | Feature | Implementation |
| :--- | :--- | :--- |
| **Core** | Map Interaction | `react-leaflet` hooks capture clicks to update the global state. |
| **Core** | Live Geocoding | Integrated **Nominatim API** via a custom Next.js Route Handler. |
| **Core** | Data Sync | Bi-directional sync between Sidebar and Map via **Zustand**. |
| **Core** | Modern UI | **Mobile-First** design using TailwindCSS breakpoints. |
| **Bonus** | Draggable Pins | Real-time coordinate updates on `dragend` events. |
| **Bonus** | Persistence | **localStorage** integration with automated address re-validation. |
| **Bonus** | Animations | **Framer Motion** for fluid list transitions and UI feedback. |
| **Bonus** | API Proxy | Custom `/api/reverse` route to bypass **CORS** and manage UA headers. |

---

## 🧱 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Zustand + Persist Middleware
- **Mapping**: Leaflet & React-Leaflet
- **Styling**: TailwindCSS & Lucide Icons
- **Animation**: Framer Motion (Motion for React)
- **Backend**: Next.js API Routes (Server-side fetching)

---

## 🗂️ Project Structure

```text
app/
├── page.tsx               # Main Layout (Navbar, Sidebar, Map Container)
├── components/
│   ├── MapBoard.tsx       # Dynamic loader for Leaflet (No-SSR)
│   ├── MapComponent.tsx   # Map engine & Event bindings
│   ├── MyMarkerComponent.tsx # Marker logic & custom Popups
│   ├── SectionComponent.tsx  # Responsive Sidebar with Motion animations
│   └── PinItemComponent.tsx  # List items with coordinate formatting
├── api/reverse/route.ts   # API Proxy to Nominatim (CORS bypass)
├── store/usePinStore.ts   # Global state & Persistence logic
└── utils/utils.ts         # Geographic formatting utilities
