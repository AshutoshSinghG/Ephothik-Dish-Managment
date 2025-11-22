import { Server } from 'socket.io';

/**
 * Initialize Socket.IO server
 * Handles real-time communication for publish status updates
 * @param {http.Server} server - HTTP server instance
 * @returns {Server} Socket.IO server instance
 */
export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Handle client connections
  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    // Optional: Handle custom events from clients
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room: ${room}`);
    });
  });

  return io;
};

/**
 * Middleware to attach io instance to requests
 * This allows controllers to emit events
 */
export const socketMiddleware = (io) => {
  return (req, res, next) => {
    req.io = io;
    next();
  };
};

