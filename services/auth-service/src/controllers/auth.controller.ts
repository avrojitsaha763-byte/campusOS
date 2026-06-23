import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role, collegeId, collegeName } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name, email, password: hashedPassword, phone, role, collegeId, collegeName
    });

    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET || 'refresh', { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        tokens: { accessToken, refreshToken }
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export const logout = async (req: Request, res: Response) => {
  // In a real app, invalidate refresh token in DB or Redis
  res.json({ success: true, message: 'Logged out successfully' });
};

export const refreshToken = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Refresh token regenerated (stub)' });
};

export const verifyEmail = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Email verified (stub)' });
};

export const resendOtp = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'OTP resent (stub)' });
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.userId).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Password reset link sent (stub)' });
};

export const resetPassword = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Password reset successful (stub)' });
};

export const changePassword = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Password changed successfully (stub)' });
};
