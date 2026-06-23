import { Address } from './user';

export type RoomType = 'single' | 'double' | 'triple' | 'dormitory' | 'suite';
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'checkout' | 'cancelled';
export type ComplaintStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Property {
  _id: string;
  ownerId: string;
  name: string;
  type: 'hostel' | 'pg' | 'apartment';
  description: string;
  images: string[];
  address: Address;
  amenities: string[];
  rules: string[];
  genderPolicy: 'male' | 'female' | 'co-ed';
  rating: number;
  reviewCount: number;
  totalRooms: number;
  availableRooms: number;
  isVerified: boolean;
  isActive: boolean;
  contactPhone: string;
  contactEmail: string;
  createdAt: Date;
}

export interface Room {
  _id: string;
  propertyId: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  capacity: number;
  occupants: string[];     // user IDs
  pricePerMonth: number;
  pricePerDay?: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  isUnderMaintenance: boolean;
  features: string[];
  createdAt: Date;
}

export interface Booking {
  _id: string;
  tenantId: string;
  propertyId: string;
  roomId: string;
  status: BookingStatus;
  checkInDate: Date;
  checkOutDate?: Date;
  rentAmount: number;
  securityDeposit: number;
  totalPaid: number;
  paymentHistory: RentPayment[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RentPayment {
  id: string;
  month: string;          // "2024-01"
  amount: number;
  paidOn: Date;
  method: string;
  transactionId?: string;
  isLate: boolean;
}

export interface MaintenanceRequest {
  _id: string;
  tenantId: string;
  propertyId: string;
  roomId: string;
  category: 'plumbing' | 'electrical' | 'furniture' | 'cleaning' | 'other';
  title: string;
  description: string;
  images?: string[];
  priority: ComplaintPriority;
  status: ComplaintStatus;
  assignedTo?: string;
  resolvedAt?: Date;
  resolutionNote?: string;
  createdAt: Date;
}

export interface VisitorLog {
  _id: string;
  propertyId: string;
  visitorName: string;
  visitorPhone: string;
  visitorIdType: 'aadhar' | 'pan' | 'passport' | 'student_id';
  visitorIdNumber: string;
  visitingTenantId: string;
  purposeOfVisit: string;
  checkInTime: Date;
  checkOutTime?: Date;
  approvedBy?: string;
}

export interface RoommateMatchRequest {
  userId: string;
  preferences: {
    gender: 'any' | 'male' | 'female';
    studyHabits: 'early_bird' | 'night_owl' | 'flexible';
    cleanliness: 1 | 2 | 3 | 4 | 5;
    noiseLevel: 'quiet' | 'moderate' | 'loud';
    smokingAllowed: boolean;
    petsAllowed: boolean;
    budget: { min: number; max: number };
    college?: string;
    hobbies?: string[];
  };
}
