import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createAndAssignDelivery, getDeliveryStatus, setTrackingService } from './controllers/delivery.controller';
import { TrackingService } from './services/tracking.service';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Export io so controllers can use it if needed, though we pass it to the service
export const io = new Server(httpServer, { 
  cors: { origin: '*' } // In prod, restrict to frontend domain
});

const PORT = process.env.PORT || 3003;
const trackingSvc = new TrackingService(io);
setTrackingService(trackingSvc);

app.use(cors());
app.use(express.json());

// ─── API Routes ────────────────────────────────────────────────────────────
app.post('/deliveries/assign', createAndAssignDelivery);
app.get('/deliveries/:id', getDeliveryStatus);
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'logistics-service' }));

// ─── Socket.IO Rooms & Subscriptions ────────────────────────────────────────
io.on('connection', (socket) => {
  console.log('⚡ Client connected:', socket.id);
  
  // Client (buyer) wants to track an order
  socket.on('subscribe_tracking', (data: { deliveryId: string }) => {
    const room = `delivery_${data.deliveryId}`;
    socket.join(room);
    console.log(`🔌 Socket ${socket.id} joined tracking room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ─── Startup ────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB, running in degraded mode:', err);
  });

httpServer.listen(PORT, () => console.log(`🚀 Logistics Service + Socket.IO running on port ${PORT}`));
