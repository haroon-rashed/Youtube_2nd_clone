import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js'; 

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); // DEBUG

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token:", token); // DEBUG

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded JWT:", decoded); // DEBUG
    req.user = decoded; 
    next(); 
  } catch (err) {
    console.error("JWT Error:", err); // DEBUG
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Your token has expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};
