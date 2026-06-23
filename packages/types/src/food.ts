export type FoodCategory =
  | 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages'
  | 'desserts' | 'specials' | 'healthy' | 'veg' | 'non-veg' | 'vegan';

export type FoodOrderStatus =
  | 'placed' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';

export type SubscriptionPlan = 'daily' | 'weekly' | 'monthly';

export interface MenuItem {
  _id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: FoodCategory;
  images: string[];
  isVeg: boolean;
  isAvailable: boolean;
  isSpecial: boolean;
  preparationTime: number;  // minutes
  calories?: number;
  allergens?: string[];
  rating: number;
  orderCount: number;
  tags: string[];
  availableFrom?: string;   // "08:00"
  availableTo?: string;     // "22:00"
  createdAt: Date;
}

export interface FoodOrder {
  _id: string;
  customerId: string;
  vendorId: string;
  items: FoodOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: FoodOrderStatus;
  orderType: 'delivery' | 'pickup' | 'dine_in' | 'pre_order';
  paymentMethod: 'wallet' | 'coins' | 'cod';
  paymentStatus: 'pending' | 'paid';
  scheduledFor?: Date;
  specialInstructions?: string;
  estimatedReadyTime?: Date;
  kotNumber?: string;       // Kitchen Order Token
  tableNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodOrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
  notes?: string;
}

export interface MessSubscription {
  _id: string;
  userId: string;
  vendorId: string;
  plan: SubscriptionPlan;
  mealPreference: 'veg' | 'non-veg' | 'both';
  mealTimes: ('breakfast' | 'lunch' | 'dinner')[];
  startDate: Date;
  endDate: Date;
  amount: number;
  isActive: boolean;
  paymentId?: string;
  pausedDates?: Date[];
  createdAt: Date;
}

export interface Kitchen {
  _id: string;
  vendorId: string;
  name: string;
  location: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  maxOrdersPerHour: number;
  currentOrders: number;
  preparationQueue: string[];   // FoodOrder IDs
  staff: number;
  createdAt: Date;
}

export interface DemandPrediction {
  menuItemId: string;
  itemName: string;
  predictedOrders: number;
  confidence: number;
  peakHour: string;
  recommendations: string[];
}
