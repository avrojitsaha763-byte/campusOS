import { Router } from 'express';
export const orderRouter = Router();

orderRouter.get('/', (req, res) => res.json({ message: 'List food orders (stub)' }));
orderRouter.post('/', (req, res) => res.json({ message: 'Create food order (stub)' }));
orderRouter.put('/:id/status', (req, res) => res.json({ message: 'Update food order status (stub)' }));
