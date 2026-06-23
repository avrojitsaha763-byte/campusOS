import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  vendorId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  isVeg: { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: true },
  preparationTime: { type: Number, default: 15 },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
