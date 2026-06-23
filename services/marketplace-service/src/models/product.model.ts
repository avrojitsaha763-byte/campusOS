import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  vendorId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, enum: ['INR', 'COINS'], default: 'INR' },
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  condition: { type: String, enum: ['new', 'like_new', 'good', 'fair', 'poor'], default: 'new' },
  isDigital: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
