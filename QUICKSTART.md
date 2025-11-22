# 🚀 Quick Start Guide - DishManager

This guide will help you get the DishManager application up and running in minutes.

## Prerequisites

- Node.js v18 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the content from .env.example and update with your MongoDB URI
# For local MongoDB: mongodb://localhost:27017/dishmanager
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/dishmanager

# Seed the database
npm run seed

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

## Step 2: Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
# Copy the content from .env.example
# VITE_API_URL=http://localhost:5000
# VITE_SOCKET_URL=http://localhost:5000

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Step 3: Test the Application

1. Open your browser and go to `http://localhost:5173`
2. You should see the dashboard with all dishes
3. Click the "Publish" or "Unpublish" button on any dish
4. Open another browser tab/window to see real-time updates
5. Toggle a dish in one tab and watch it update in the other tab instantly!

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Make sure MongoDB is running (if using local)
- Check your MongoDB connection string in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

**Port Already in Use:**
- Change the PORT in `.env` to a different port (e.g., 5001)
- Update frontend `.env` to match the new port

### Frontend Issues

**Cannot Connect to Backend:**
- Make sure the backend server is running
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

**Socket.IO Not Connecting:**
- Verify `VITE_SOCKET_URL` in frontend `.env`
- Check that Socket.IO is initialized in backend
- Check browser console for connection errors

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [backend/README.md](./backend/README.md) for backend-specific details
- Check [frontend/README.md](./frontend/README.md) for frontend-specific details
- Deploy to production using the deployment guides in the README files

## Project Structure

```
DishManager/
├── backend/          # Node.js + Express + MongoDB + Socket.IO
├── frontend/         # React + Vite + TailwindCSS
└── README.md         # Main documentation
```

## API Endpoints

- `GET /api/dishes` - Get all dishes
- `PUT /api/dishes/:dishId/toggle` - Toggle publish status

## Features

✅ Real-time updates with Socket.IO
✅ Beautiful responsive UI
✅ Toast notifications
✅ Loading and error states
✅ Optimistic UI updates

Enjoy building with DishManager! 🍽️

