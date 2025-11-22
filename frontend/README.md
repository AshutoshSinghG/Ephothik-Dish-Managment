# 🍽️ DishManager Frontend

Frontend application for DishManager - A full-stack dish management application built with React, Vite, TailwindCSS, and Socket.IO.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Components](#components)
- [Hooks](#hooks)
- [Deployment](#deployment)

## ✨ Features

- ✅ Modern, responsive UI with TailwindCSS
- ✅ Real-time updates using Socket.IO
- ✅ Toast notifications for user feedback
- ✅ Loading and error states
- ✅ Optimistic UI updates
- ✅ Beautiful card-based layout
- ✅ Publish/Unpublish toggle functionality
- ✅ Real-time status indicators

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Real-Time:** Socket.IO Client
- **Notifications:** React Hot Toast

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see backend README)

## 🚀 Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your backend API URL.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:5173` (or the next available port).

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the frontend root directory with the following variables:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

**For Production (Vercel):**
```env
VITE_API_URL=https://your-backend.onrender.com
VITE_SOCKET_URL=https://your-backend.onrender.com
```

## 📱 Usage

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🧩 Components

### Dashboard (`src/pages/Dashboard.jsx`)

Main page component that:
- Fetches and displays all dishes
- Handles real-time updates via Socket.IO
- Shows loading, error, and empty states
- Displays statistics (total, published, unpublished)

### DishCard (`src/components/DishCard.jsx`)

Individual dish card component that displays:
- Dish image with fallback
- Dish name
- Published/Unpublished badge
- Toggle button with loading state
- Error handling

## 🎣 Hooks

### useFetchDishes (`src/hooks/useFetchDishes.js`)

Custom hook for fetching dishes:
- Manages loading state
- Handles errors
- Provides refetch function

**Usage:**
```jsx
const { dishes, loading, error, refetch } = useFetchDishes()
```

### useSocket (`src/hooks/useSocket.js`)

Custom hook for Socket.IO connection:
- Manages connection state
- Handles reconnection
- Returns socket instance

**Usage:**
```jsx
const { socket, isConnected } = useSocket()
```

## 🎨 UI Features

### Real-Time Updates

- When a dish's publish status is toggled (by any user or the backend), all connected clients receive an instant update
- No page refresh required
- Toast notification appears for each update

### Responsive Design

- Mobile-first approach
- Grid layout adapts to screen size:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large Desktop: 4 columns

### Loading States

- Full-page loading spinner while fetching dishes
- Button loading state during toggle operations
- Disabled buttons during operations

### Error Handling

- Error messages displayed in user-friendly format
- Retry functionality
- Network error handling

## 🚢 Deployment

### Deploy to Vercel

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

3. **Deploy via CLI:**
   ```bash
   cd frontend
   vercel
   ```
   Or connect your GitHub repository to Vercel.

4. **Add Environment Variables:**
   - Go to your project settings in Vercel
   - Add environment variables:
     - `VITE_API_URL` - Your backend URL (e.g., `https://your-backend.onrender.com`)
     - `VITE_SOCKET_URL` - Your backend URL (same as above)

5. **Deploy:**
   - Vercel will automatically deploy on every push to your main branch
   - Your app will be available at `https://your-project.vercel.app`

### Environment Variables for Production

```env
VITE_API_URL=https://your-backend.onrender.com
VITE_SOCKET_URL=https://your-backend.onrender.com
```

**Important:** 
- Vite requires the `VITE_` prefix for environment variables
- After changing environment variables in Vercel, you need to redeploy

### Build Configuration

Vercel will automatically detect Vite and use the correct build settings:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 🎥 Video Recording Guide

### How to Record Required Videos (Demo + Code Explanation)

#### Using Loom:
1. Go to [loom.com](https://www.loom.com) and sign up/login
2. Click "New Recording"
3. Choose "Screen + Camera" or "Screen Only"
4. Select the window/tab you want to record
5. Click "Start Recording"
6. Demonstrate the application features:
   - Show the dashboard loading
   - Toggle publish/unpublish status
   - Show real-time updates (open multiple tabs)
   - Show toast notifications
   - Show error handling
7. Stop recording and share the link

#### Using OBS Studio:
1. Download and install [OBS Studio](https://obsproject.com/)
2. Add a "Display Capture" source for your screen
3. Add a "Window Capture" for your code editor (optional)
4. Add an "Audio Input Capture" for your microphone
5. Click "Start Recording"
6. Demonstrate the application
7. Stop recording and save the video file

#### What to Include in Your Video:

**Demo Video:**
- Show the dashboard loading dishes
- Toggle publish/unpublish status on multiple dishes
- Show real-time updates (open multiple browser tabs/windows)
- Show toast notifications appearing
- Show error handling (disconnect backend, show error state)
- Show responsive design (resize browser)

**Code Explanation Video:**
- Walk through frontend structure
- Explain React components (Dashboard, DishCard)
- Explain custom hooks (useFetchDishes, useSocket)
- Explain Socket.IO integration
- Explain state management
- Show TailwindCSS usage
- Explain deployment process

## 📝 Notes

- The frontend uses Vite for fast development and optimized builds
- Socket.IO automatically handles reconnection
- Toast notifications use react-hot-toast for a great UX
- All images have fallback handling for broken URLs
- The app is fully responsive and works on all devices

## 🐛 Troubleshooting

### Socket.IO Not Connecting

- Check that the backend server is running
- Verify `VITE_SOCKET_URL` is correct
- Check browser console for errors
- Ensure CORS is properly configured on the backend

### API Requests Failing

- Verify `VITE_API_URL` is correct
- Check that the backend server is running
- Check browser console for CORS errors
- Verify network connectivity

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires v18+)
- Verify all environment variables are set

## 🤝 Contributing

This is a project assignment. For questions or issues, please refer to the problem statement.

## 📄 License

ISC

---

**Built with ❤️ for DishManager**

