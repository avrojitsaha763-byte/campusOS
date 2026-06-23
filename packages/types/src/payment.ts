export type TransactionType =
  | 'topup' | 'payment' | 'refund' | 'escrow_hold' | 'escrow_release'
  | 'delivery_earning' | 'platform_fee' | 'commission' | 'transfer';

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'reversed';

export interface Wallet {
  id: string;
  userId: string;
  balanceINR: number;       // Real money balance (paise)
  balanceCoins: number;     // Campus Coins
  escrowINR: number;        // Locked in escrow
  escrowCoins: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  userId: string;
  type: TransactionType;
  currency: 'INR' | 'COINS';
  amount: number;           // always positive (use type to determine direction)
  balanceBefore: number;
  balanceAfter: number;
  reference?: string;       // order ID, delivery ID, etc.
  status: TransactionStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface Escrow {
  id: string;
  orderId: string;
  buyerWalletId: string;
  sellerWalletId: string;
  amount: number;
  currency: 'INR' | 'COINS';
  status: 'held' | 'released' | 'refunded' | 'disputed';
  heldAt: Date;
  releasedAt?: Date;
  autoReleaseAt: Date;    // auto-release after 3 days if no dispute
}

export interface TopUpRequest {
  amount: number;         // in paise for INR
  currency: 'INR' | 'COINS';
  paymentMethod: 'razorpay' | 'upi' | 'netbanking';
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
}
