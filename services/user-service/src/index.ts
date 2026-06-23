import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());

app.get('/profile', (req, res) => res.json({ message: 'Get profile (stub)' }));
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'user-service' }));

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB, running in degraded mode:', err);
  });

app.listen(PORT, () => console.log(`🚀 User Service running on port ${PORT}`));
