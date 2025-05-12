import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB, sequelize } from './config/db.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imagesRoutes.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5174', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

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

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.use('/api/auth', userRouter);
app.use('/api/images', imageRouter);


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
