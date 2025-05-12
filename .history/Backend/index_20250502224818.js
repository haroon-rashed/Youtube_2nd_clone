import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB, sequelize } from './config/db.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imagesRoutes.js';
import http from 'http';
import socketIo from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server with Express app
const io = socketIo(server); // Initialize socket.io with the HTTP server

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();
    await sequelize.sync();
    console.log('Database connected and tables synced.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
})();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle custom events here
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use('/api/auth', userRouter);
app.use('/api/images', imageRouter);

// Start the server with Socket.IO integrated
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
