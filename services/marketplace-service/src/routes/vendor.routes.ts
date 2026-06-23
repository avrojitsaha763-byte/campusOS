import { Router } from 'express';
export const vendorRouter = Router();

vendorRouter.get('/', (req, res) => res.json({ message: 'List vendors (stub)' }));
vendorRouter.post('/', (req, res) => res.json({ message: 'Create vendor profile (stub)' }));
vendorRouter.get('/:id/analytics', (req, res) => res.json({ message: 'Get vendor analytics (stub)' }));
