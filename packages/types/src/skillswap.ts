export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type SessionStatus = 'proposed' | 'accepted' | 'ongoing' | 'completed' | 'cancelled' | 'disputed';
export type BarterStatus = 'proposed' | 'counter_offered' | 'accepted' | 'completed' | 'cancelled';

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface SkillProfile {
  _id: string;
  userId: string;
  skills: SkillOffering[];
  wantedSkills: SkillWant[];
  headline: string;
  bio: string;
  hourlyRate?: number;  // INR per hour for paid services
  acceptsBarter: boolean;
  rating: number;
  totalSessions: number;
  responseTime: string;  // "< 1 hour", "1-3 hours", etc.
  languages: string[];
  availability: AvailabilitySlot[];
  createdAt: Date;
}

export interface SkillOffering {
  skillId: string;
  skillName: string;
  level: SkillLevel;
  yearsOfExperience: number;
  description: string;
  portfolio?: string[];   // URLs or image paths
  certifications?: string[];
}

export interface SkillWant {
  skillId: string;
  skillName: string;
  targetLevel: SkillLevel;
  description?: string;
}

export interface AvailabilitySlot {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;  // 0=Sun
  startTime: string;  // "09:00"
  endTime: string;    // "17:00"
}

export interface SkillMatch {
  _id: string;
  requesterId: string;
  providerId: string;
  requiredSkillId: string;
  offeredSkillId?: string;  // for barter
  matchScore: number;       // 0-100
  matchType: 'barter' | 'paid';
  status: 'suggested' | 'contacted' | 'converted' | 'rejected';
  aiExplanation: string;
  createdAt: Date;
}

export interface Session {
  _id: string;
  providerId: string;
  learnerId: string;
  skillId: string;
  skillName: string;
  sessionType: 'paid' | 'barter';
  status: SessionStatus;
  scheduledAt: Date;
  durationMinutes: number;
  amount?: number;
  coinAmount?: number;
  meetingLink?: string;
  notes?: string;
  providerRating?: number;
  learnerRating?: number;
  providerReview?: string;
  learnerReview?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BarterProposal {
  _id: string;
  proposerId: string;
  receiverId: string;
  proposedSkillId: string;
  requestedSkillId: string;
  proposedHours: number;
  requestedHours: number;
  message: string;
  status: BarterStatus;
  counterOffer?: {
    proposedHours: number;
    requestedHours: number;
    message: string;
  };
  createdAt: Date;
}
