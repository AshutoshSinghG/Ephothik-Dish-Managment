# 🍽️ DishManager Backend

Backend API for DishManager - A full-stack dish management application built with Node.js, Express.js, MongoDB, and Socket.IO.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Socket.IO Events](#socketio-events)
- [Database Schema](#database-schema)
- [Scripts](#scripts)
- [Deployment](#deployment)

## ✨ Features

- ✅ RESTful API for dish management
- ✅ Real-time updates using Socket.IO
- ✅ MongoDB database with Mongoose ODM
- ✅ CORS enabled for frontend integration
- ✅ Error handling and validation
- ✅ Environment-based configuration

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Real-Time:** Socket.IO
- **Environment:** dotenv

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## 🚀 Installation

1. **Clone the repository** (if applicable) or navigate to the backend directory:
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB connection string and other configuration.

4. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/dishmanager
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### MongoDB Setup

**Option 1: Local MongoDB**
- Install MongoDB locally
- Use connection string: `mongodb://localhost:27017/dishmanager`

**Option 2: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Use connection string: `mongodb+srv://username:password@cluster.mongodb.net/dishmanager`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check
```
GET /api/health
```
**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Get All Dishes
```
GET /api/dishes
```
**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "dishId": "dish-001",
      "dishName": "Margherita Pizza",
      "imageUrl": "https://...",
      "isPublished": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 3. Toggle Publish Status
```
PUT /api/dishes/:dishId/toggle
```
**Parameters:**
- `dishId` (path parameter): The unique dish identifier

**Response:**
```json
{
  "success": true,
  "message": "Dish published successfully",
  "data": {
    "_id": "...",
    "dishId": "dish-001",
    "dishName": "Margherita Pizza",
    "imageUrl": "https://...",
    "isPublished": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Dish with ID dish-999 not found"
}
```

## 🔌 Socket.IO Events

### Server Events (Emitted to Clients)

#### `publish-status-updated`
Emitted when a dish's publish status is toggled.

**Payload:**
```json
{
  "dishId": "dish-001",
  "isPublished": true,
  "dish": {
    "_id": "...",
    "dishId": "dish-001",
    "dishName": "Margherita Pizza",
    "imageUrl": "https://...",
    "isPublished": true
  }
}
```

### Client Events (Optional)

#### `join-room`
Clients can join rooms for more targeted updates (optional feature).

## 📊 Database Schema

### Dish Model

```javascript
{
  dishId: String (unique, required, indexed),
  dishName: String (required),
  imageUrl: String (required),
  isPublished: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 📜 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample dishes

## 🚢 Deployment

### Deploy to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service:**
   - Connect your GitHub repository
   - Select the `backend` directory as root
   - Build command: `npm install`
   - Start command: `npm start`

3. **Add Environment Variables:**
   - `MONGODB_URI` - Your MongoDB connection string
   - `PORT` - Port (Render will provide this automatically)
   - `FRONTEND_URL` - Your frontend URL (e.g., `https://your-frontend.vercel.app`)
   - `NODE_ENV` - Set to `production`

4. **Deploy:**
   - Render will automatically deploy on every push to your main branch

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dishmanager
PORT=10000
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

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

#### What to Include in Your Video:
- **Demo Video:**
  - Show the dashboard loading dishes
  - Toggle publish/unpublish status
  - Show real-time updates (open multiple tabs)
  - Show toast notifications
  - Show error handling

- **Code Explanation Video:**
  - Walk through backend structure
  - Explain API endpoints
  - Explain Socket.IO implementation
  - Walk through frontend components
  - Explain state management
  - Show deployment process

## 📝 Notes

- The API uses CORS to allow requests from the frontend
- Socket.IO is configured to work with the frontend URL
- All timestamps are in ISO 8601 format
- The database is automatically indexed on `dishId` for faster queries


