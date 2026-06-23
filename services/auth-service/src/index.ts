import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.routes';
import { logger } from './utils/logger';
dotenv.config();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
redis.on('error', (err) => logger.warn('⚠️ Redis not available, running without cache'));

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3100'],
  credentials: true,
}));

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later' },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many auth attempts, please try again later' },
});

app.use(limiter);
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.post('/demo/login', (req, res) => {
  res.json({
    success: true,
    message: 'Demo Session Synchronized',
    token: 'TITAN_DEMO_JWT_' + Date.now(),
    user: { id: 'titan_demo', name: 'Elite User', role: 'student' }
  });
});

app.use('/auth', authLimiter, authRouter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'auth-service', timestamp: new Date().toISOString() });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ─── Database Connections ─────────────────────────────────────────────────────
async function startServer() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      logger.info('✅ MongoDB connected');
    } else {
      logger.warn('⚠️ MONGO_URI not provided, running in degraded mode');
    }
  } catch (error) {
    logger.error('❌ Failed to connect to MongoDB, running in degraded mode:', error);
  }

  app.listen(PORT, () => {
    logger.info(`🚀 Auth Service running on port ${PORT}`);
  });
}

startServer();
