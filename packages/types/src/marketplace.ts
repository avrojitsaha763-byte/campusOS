import { Address } from './user';

// ─── Product ───────────────────────────────────────────────────────────────────
export type ProductCategory =
  | 'books' | 'electronics' | 'food' | 'essentials' | 'clothing'
  | 'notes' | 'courses' | 'services' | 'crafts' | 'digital' | 'other';

export type ProductCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor';

export interface Product {
  _id: string;
  vendorId: string;
  title: string;
  description: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  discountedPrice?: number;
  currency: 'INR' | 'COINS';
  images: string[];
  stock: number;
  condition: ProductCondition;
  tags: string[];
  isDigital: boolean;
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  soldCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Order ─────────────────────────────────────────────────────────────────────
export type OrderStatus =
  | 'pending' | 'accepted' | 'packed' | 'dispatched'
  | 'out_for_delivery' | 'delivered' | 'completed'
  | 'cancelled' | 'return_requested' | 'returned' | 'refunded';

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  vendorId: string;
  image: string;
}

export interface Order {
  _id: string;
  customerId: string;
  vendorId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  total: number;
  currency: 'INR' | 'COINS';
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: 'wallet' | 'coins' | 'razorpay' | 'cod';
  deliveryAddress: Address;
  deliveryPartnerId?: string;
  trackingHistory: TrackingEvent[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrackingEvent {
  status: OrderStatus;
  message: string;
  timestamp: Date;
  location?: { lat: number; lng: number };
}

// ─── Vendor ─────────────────────────────────────────────────────────────────────
export interface Vendor {
  _id: string;
  userId: string;
  shopName: string;
  description: string;
  logo?: string;
  banner?: string;
  category: string[];
  address: Address;
  rating: number;
  reviewCount: number;
  totalSales: number;
  totalRevenue: number;
  commissionRate: number;
  subscriptionPlan: 'free' | 'basic' | 'pro' | 'enterprise';
  isVerified: boolean;
  isActive: boolean;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountHolder: string;
  };
  createdAt: Date;
}

// ─── Review ──────────────────────────────────────────────────────────────────
export interface Review {
  _id: string;
  productId?: string;
  vendorId?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;    // 1-5
  title: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Date;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  vendorId: string;
  stock: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  total: number;
  updatedAt: Date;
}
