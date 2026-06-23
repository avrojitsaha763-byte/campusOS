import { Address } from './user';

export type DeliveryStatus =
  | 'pending_assignment' | 'assigned' | 'picked_up'
  | 'in_transit' | 'delivered' | 'failed' | 'returned';

export type PartnerAvailability = 'available' | 'busy' | 'offline';

export interface Delivery {
  _id: string;
  orderId: string;
  partnerId?: string;
  status: DeliveryStatus;
  pickupAddress: Address;
  dropAddress: Address;
  estimatedDistance: number;  // km
  estimatedDuration: number;  // minutes
  actualDuration?: number;
  fee: number;
  partnerEarnings: number;
  platformCut: number;
  isPriority: boolean;        // for food orders
  isBatched: boolean;
  batchId?: string;
  currentLocation?: { lat: number; lng: number };
  trackingHistory: DeliveryTrackingEvent[];
  otp?: string;               // delivery confirmation OTP
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryTrackingEvent {
  status: DeliveryStatus;
  timestamp: Date;
  location?: { lat: number; lng: number };
  message: string;
}

export interface DeliveryPartner {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  avatar?: string;
  availability: PartnerAvailability;
  isVerified: boolean;
  vehicle: 'bike' | 'bicycle' | 'walking';
  currentLocation?: { lat: number; lng: number };
  rating: number;
  totalDeliveries: number;
  successRate: number;
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  activeDeliveryId?: string;
}

export interface DeliveryRoute {
  partnerId: string;
  waypoints: Array<{
    orderId: string;
    type: 'pickup' | 'dropoff';
    address: Address;
    lat: number;
    lng: number;
    sequence: number;
    estimatedArrival: Date;
  }>;
  totalDistance: number;
  totalDuration: number;
  optimizedAt: Date;
}

export interface DeliveryHeatmapData {
  lat: number;
  lng: number;
  weight: number;  // delivery density
  area: string;
}
