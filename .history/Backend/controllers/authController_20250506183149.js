import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import { JWT_SECRET } from '../config/jwt.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const generateOTP = () => {
  let otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

const sendOtpEmail = async (userEmail, otp) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Verify your email',
    html: `
    <html>
      <body>
        <h2>Email Verification</h2>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      otp,
    });

    await sendOtpEmail(email, otp);

    return res.status(201).json({
      message: 'User created successfully. Please verify your email.',
      user_id: newUser.id, // frontend stores this for OTP verification
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error during signup' });
  }
};


export const verifyUser = async (req, res) => {
  try {
    const { otp } = req.body;
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (String(user.otp) !== String(otp)) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    user.otp = null;
    user.isVerified = true;
    await user.save();

    const token = generateToken(user);

    return res.status(200).json({
      message: 'User verified successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ message: 'Server error during verification' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const updateData = { name, email };

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const [updated] = await User.update(updateData, {
      where: { id: req.params.id },
    });

    if (updated) res.json({ message: 'User updated successfully' });
    else res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'User deleted successfully' });
    else res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
