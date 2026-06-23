import mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const deliverySchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  partnerId: { type: String }, // Null when unassigned
  status: { 
    type: String, 
    enum: ['pending_assignment', 'assigned', 'picked_up', 'in_transit', 'delivered', 'failed'],
    default: 'pending_assignment'
  },
  pickupLocation: {
    type: pointSchema,
    required: true
  },
  dropoffLocation: {
    type: pointSchema,
    required: true
  },
  currentLocation: {
    type: pointSchema
  },
  estimatedDistance: { type: Number }, // in km
  estimatedDuration: { type: Number }, // in minutes
  fee: { type: Number, required: true },
  partnerEarnings: { type: Number, required: true },
  isPriority: { type: Boolean, default: false }
}, { timestamps: true });

// Index for geospatial queries
deliverySchema.index({ pickupLocation: '2dsphere' });
deliverySchema.index({ dropoffLocation: '2dsphere' });
deliverySchema.index({ currentLocation: '2dsphere' });

export const Delivery = mongoose.model('Delivery', deliverySchema);
