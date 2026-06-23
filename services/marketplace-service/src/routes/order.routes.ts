import { Router } from 'express';
export const orderRouter = Router();

orderRouter.get('/', (req, res) => res.json({ message: 'List orders (stub)' }));
orderRouter.post('/', (req, res) => res.json({ message: 'Create order (stub)' }));
orderRouter.get('/:id', (req, res) => res.json({ message: 'Get order details (stub)' }));
orderRouter.put('/:id/status', (req, res) => res.json({ message: 'Update order status (stub)' }));
