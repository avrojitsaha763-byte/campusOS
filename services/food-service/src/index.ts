import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const mockMenus = [
  { _id: '1', name: 'Peri-Peri Paneer Wrap', price: 145, description: 'Grilled paneer with spicy peri-peri sauce.', category: 'Veg', tags: ['High Protein'] },
  { _id: '2', name: 'Hazelnut Cold Brew', price: 120, description: 'Slow-steeped coffee with hazelnut flavor.', category: 'Beverage', tags: ['Fast'] },
  { _id: '3', name: 'Cheese Burst Pizza', price: 299, description: 'Extra cheesy crust with garden fresh toppings.', category: 'Veg', tags: ['Trending'] },
  { _id: '4', name: 'Veg Hakka Noodles', price: 90, description: 'Street-style noodles with crisp vegetables.', category: 'Veg', tags: ['High Protein'] }
];

const menuRouter = Router();
menuRouter.get('/', (req, res) => res.json({ success: true, data: mockMenus }));

const orderRouter = Router();
orderRouter.post('/', (req, res) => {
  res.status(201).json({ 
    success: true, 
    orderId: 'ORD_' + Math.random().toString(36).substr(2, 9),
    message: 'Order Synchronized with Kitchen Node' 
  });
});

app.use('/menus', menuRouter);
app.use('/food-orders', orderRouter);

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'food-service' }));

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB, running in degraded mode:', err);
  });

app.listen(PORT, () => console.log(`🚀 Food Service running on port ${PORT}`));
