# 🍽️ DishManager - Full Stack Dish Management Application

A complete full-stack MERN application for managing dishes with real-time updates, built with Node.js, Express.js, React, MongoDB, and Socket.IO.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)

## 🎯 Overview

DishManager is a full-stack application that allows users to:
- View all dishes in a beautiful dashboard
- Toggle publish/unpublish status for each dish
- See real-time updates when changes are made (by any user or the backend)
- Get instant feedback with toast notifications

## ✨ Features

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ Real-time updates using Socket.IO
- ✅ CORS enabled for frontend integration
- ✅ Error handling and validation
- ✅ Environment-based configuration

### Frontend
- ✅ Modern, responsive UI with TailwindCSS
- ✅ Real-time updates using Socket.IO Client
- ✅ Toast notifications for user feedback
- ✅ Loading and error states
- ✅ Optimistic UI updates
- ✅ Beautiful card-based layout
- ✅ Publish/Unpublish toggle functionality

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Real-Time:** Socket.IO
- **Environment:** dotenv

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Real-Time:** Socket.IO Client
- **Notifications:** React Hot Toast

## 📂 Project Structure

```
DishManager/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Dish.js              # Mongoose schema
│   │   ├── routes/
│   │   │   └── dishRoutes.js        # API routes
│   │   ├── controllers/
│   │   │   └── dishController.js    # Business logic
│   │   ├── config/
│   │   │   └── db.js                # MongoDB connection
│   │   ├── scripts/
│   │   │   └── seedDishes.js        # Database seeding script
│   │   ├── socket.js                # Socket.IO setup
│   │   └── server.js                # Express server
│   ├── data/
│   │   └── dishes.json              # Sample dishes data
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── DishCard.jsx         # Dish card component
    │   ├── pages/
    │   │   └── Dashboard.jsx        # Main dashboard page
    │   ├── hooks/
    │   │   ├── useFetchDishes.js    # Custom hook for fetching dishes
    │   │   └── useSocket.js         # Custom hook for Socket.IO
    │   ├── App.jsx                  # Root component
    │   ├── main.jsx                 # Entry point
    │   └── index.css                # Global styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example
    └── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd DishManager
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run seed  # Seed the database
npm run dev   # Start development server
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev   # Start development server
```

The frontend will run on `http://localhost:5173`

## 🔧 Backend Setup

See [backend/README.md](./backend/README.md) for detailed backend setup instructions.

### Environment Variables

Create `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/dishmanager
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Seed Database

```bash
cd backend
npm run seed
```

## 🎨 Frontend Setup

See [frontend/README.md](./frontend/README.md) for detailed frontend setup instructions.

### Environment Variables

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## 🚢 Deployment

### Backend → Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `FRONTEND_URL` - Your frontend URL (Vercel)
   - `NODE_ENV=production`

### Frontend → Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set root directory to `frontend`
4. Add environment variables:
   - `VITE_API_URL` - Your backend URL (Render)
   - `VITE_SOCKET_URL` - Your backend URL (Render)
5. Deploy

See individual README files for detailed deployment instructions.

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### GET /api/dishes
Get all dishes sorted by name.

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

#### PUT /api/dishes/:dishId/toggle
Toggle publish status of a dish.

**Response:**
```json
{
  "success": true,
  "message": "Dish published successfully",
  "data": {...}
}
```

### Socket.IO Events

#### `publish-status-updated`
Emitted when a dish's publish status is toggled.

**Payload:**
```json
{
  "dishId": "dish-001",
  "isPublished": true,
  "dish": {...}
}
```

## 📸 Screenshots

### Dashboard View
![Dashboard](./screenshots/dashboard.png)

### Real-Time Updates
![Real-Time](./screenshots/realtime.png)

### Mobile View
![Mobile](./screenshots/mobile.png)

*Note: Add your screenshots to the `screenshots/` directory*

## 🎥 Video Recording Guide

### How to Record Required Videos (Demo + Code Explanation)

#### Using Loom:
1. Go to [loom.com](https://www.loom.com) and sign up/login
2. Click "New Recording"
3. Choose "Screen + Camera" or "Screen Only"
4. Select the window/tab you want to record
5. Click "Start Recording"
6. Demonstrate the application features
7. Stop recording and share the link

#### Using OBS Studio:
1. Download and install [OBS Studio](https://obsproject.com/)
2. Add a "Display Capture" source for your screen
3. Add a "Window Capture" for your code editor (optional)
4. Add an "Audio Input Capture" for your microphone
5. Click "Start Recording"
6. Demonstrate the application
7. Stop recording and save the video file

#### What to Include:

**Demo Video:**
- Show the dashboard loading dishes
- Toggle publish/unpublish status
- Show real-time updates (open multiple tabs)
- Show toast notifications
- Show error handling

**Code Explanation Video:**
- Walk through backend structure
- Explain API endpoints
- Explain Socket.IO implementation
- Walk through frontend components
- Explain state management
- Show deployment process

## 📝 Notes

- The application uses ES modules (import/export)
- Socket.IO automatically handles reconnection
- All timestamps are in ISO 8601 format
- The database is automatically indexed on `dishId`

## 🤝 Contributing

This is a project assignment. For questions or issues, please refer to the problem statement.

## 📄 License

ISC

---

**Built with ❤️ for DishManager**

