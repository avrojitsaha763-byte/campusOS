// User & Auth Types
export type UserRole = 'admin' | 'vendor' | 'delivery_partner' | 'property_owner' | 'user';

export interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  collegeId?: string;
  collegeName?: string;
  avatar?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  reputationScore: number;
  walletId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  bio?: string;
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  address?: Address;
  stats: {
    ordersPlaced: number;
    ordersDelivered: number;
    servicesProvided: number;
    ratingsReceived: number;
    avgRating: number;
  };
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  lat?: number;
  lng?: number;
}

export interface ReputationScore {
  userId: string;
  score: number;          // 0-1000
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'titanium';
  breakdown: {
    paymentHistory: number;
    deliverySuccess: number;
    sellerRating: number;
    buyerRating: number;
    communityContribution: number;
  };
  badges: string[];
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  collegeId?: string;
  collegeName: string;
}
