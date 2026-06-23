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
  { id: '1', name: 'Titan Residency', capacity: 450, occupied: 380, averageRating: 4.9, amenities: ['Fiber Net', 'Climate Control'], image: 'https://images.unsplash.com/photo-1555854817-5b2260d50c50?auto=format&fit=crop&q=80&w=800' },
  { id: '2', name: 'Nebula Hall', capacity: 300, occupied: 150, averageRating: 4.7, amenities: ['Gym', '24/7 Cafeteria'], image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800' }
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
