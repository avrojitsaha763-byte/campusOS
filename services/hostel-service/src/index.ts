import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const mockProperties = [
  { 
    id: '1', 
    name: 'Titan Residency', 
    type: 'Luxury PG Room',
    location: 'Sector Core 4',
    price: 12000,
    available: 4,
    vibe: [
      { label: 'Security Level', value: 95, color: 'text-emerald-400' },
      { label: 'Noise Dampening', value: 80, color: 'text-cyan-400' },
      { label: 'Social Density', value: 65, color: 'text-purple-400' }
    ],
    amenities: ['Fiber Net', 'Climate Control', 'Gym Access'], 
    image: '🏢' 
  },
  { 
    id: '2', 
    name: 'Nebula Hall', 
    type: 'Shared Dormitory',
    location: 'Rim Campus Sector',
    price: 6500,
    available: 12,
    vibe: [
      { label: 'Security Level', value: 85, color: 'text-emerald-400' },
      { label: 'Noise Dampening', value: 70, color: 'text-cyan-400' },
      { label: 'Social Density', value: 90, color: 'text-purple-400' }
    ],
    amenities: ['24/7 Canteen', 'Study Zones', 'Power Backup'], 
    image: '🏠' 
  }
];

const mockRooms = [
  { id: 'R101', propertyId: '1', type: 'Single sharing', status: 'available', price: 12000, view: 'Lake View' },
  { id: 'R102', propertyId: '1', type: 'Double sharing', status: 'available', price: 8000, view: 'Garden' },
  { id: 'R201', propertyId: '2', type: 'Triple sharing', status: 'available', price: 6500, view: 'City View' }
];

const hostelRouter = express.Router();

hostelRouter.get('/properties', (req, res) => res.json({ success: true, data: mockProperties }));
hostelRouter.get('/rooms', (req, res) => res.json({ success: true, data: mockRooms }));
hostelRouter.post('/bookings', (req, res) => {
  res.status(201).json({ 
    success: true, 
    bookingId: 'BK_' + Math.random().toString(36).substr(2, 9),
    message: 'Booking Synchronized with Residency Node' 
  });
});

app.use('/', hostelRouter);

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'hostel-service' }));

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB, running in degraded mode:', err);
  });

app.listen(PORT, () => console.log(`🚀 Hostel Service running on port ${PORT}`));
