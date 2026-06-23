import { Router } from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  verifyEmail,
  resendOtp,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/auth.validator';

export const authRouter = Router();

// Public routes
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/refresh', refreshToken);
authRouter.post('/verify-email', validate(verifyEmailSchema), verifyEmail);
authRouter.post('/resend-otp', resendOtp);
authRouter.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
authRouter.post('/reset-password', validate(resetPasswordSchema), resetPassword);

// Protected routes
authRouter.post('/logout', authenticate, logout);
authRouter.get('/me', authenticate, getMe);
authRouter.put('/change-password', authenticate, changePassword);
