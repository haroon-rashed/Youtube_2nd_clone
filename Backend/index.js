import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB, sequelize } from './config/db.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imagesRoutes.js';

dotenv.config();

const app = express();
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

app.use('/api/auth', userRouter);
app.use('/api/images', imageRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
