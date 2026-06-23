import express, { Request, Response } from 'express';
// @ts-ignore
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

const mockWallet = {
  balance: 2450.50,
  currency: "Campus Coins",
  pendingEscrow: 120.00,
  recentTransactions: [
    { id: 'tx_1', type: 'debit', amount: 45, description: 'Canteen Order #4521', date: 'Today, 2:30 PM', status: 'Completed', category: 'Food' },
    { id: 'tx_2', type: 'credit', amount: 200, description: 'SkillSwap: React Tutoring', date: 'Yesterday', status: 'Completed', category: 'SkillSwap' },
    { id: 'tx_3', type: 'debit', amount: 15, description: 'Logistics Tap: Node #881', date: 'April 2, 2026', status: 'Processing', category: 'Logistics' },
    { id: 'tx_4', type: 'credit', amount: 50, description: 'Refund: Item #281-MARKET', date: 'April 1, 2026', status: 'Completed', category: 'Marketplace' }
  ]
};

app.get('/wallet', (req: Request, res: Response) => res.json({ success: true, data: mockWallet }));
app.post('/wallet/topup', async (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    data: { 
      id: 'mock_order_' + Date.now(),
      amount: req.body.amount,
      currency: 'INR',
      status: 'created'
    } 
  });
});
app.post('/escrow/hold', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Capital held in neural escrow' });
});

app.get('/health', (_: Request, res: Response) => res.json({ status: 'ok', service: 'payment-service' }));

app.listen(PORT, () => console.log(`🚀 Payment Service running on port ${PORT}`));
