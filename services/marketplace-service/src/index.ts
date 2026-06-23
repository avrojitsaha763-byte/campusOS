import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Router } from 'express';

const mockProducts = new Map<string, any>([
  ['1', { id: '1', name: "Neural Network Notes", price: 150, coins: 15, seller: "Alex Chen", category: "Academic", icon: "📝", condition: "Pristine", glow: "rgba(14, 165, 233, 0.2)", surge: true, stock: 12 }],
  ['2', { id: '2', name: "Mechanical Keyboard", price: 2400, coins: 240, seller: "Sarah J.", category: "Electronics", icon: "⌨️", condition: "Like New", glow: "rgba(99, 102, 241, 0.2)", surge: false, stock: 1 }],
  ['3', { id: '3', name: "Scientific Calculator", price: 800, coins: 80, seller: "Mike R.", category: "Electronics", icon: "🧮", condition: "Used", glow: "rgba(192, 132, 252, 0.2)", surge: false, stock: 4 }]
]);

const productRouter = Router();
productRouter.get('/', (req, res) => res.json({ success: true, data: Array.from(mockProducts.values()) }));
productRouter.get('/:id', (req, res) => res.json({ success: true, data: mockProducts.get(req.params.id) }));

const orderRouter = Router();
const vendorRouter = Router();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/vendors', vendorRouter);

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'marketplace-service' }));

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB, running in degraded mode:', err);
  });

app.listen(PORT, () => console.log(`🚀 Marketplace Service running on port ${PORT}`));
