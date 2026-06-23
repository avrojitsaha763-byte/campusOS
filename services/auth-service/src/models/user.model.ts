import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['admin', 'vendor', 'delivery_partner', 'property_owner', 'user'], default: 'user' },
  collegeId: { type: String },
  collegeName: { type: String },
  avatar: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  reputationScore: { type: Number, default: 50 },
  walletId: { type: String }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);
