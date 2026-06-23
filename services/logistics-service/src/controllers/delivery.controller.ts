import { Request, Response } from 'express';
import { Delivery } from '../models/delivery.model';
import { TrackingService } from '../services/tracking.service';
import { io } from '../index';
import { mockDeliveries } from '../services/mockStorage';

let trackingService: TrackingService;

export const setTrackingService = (ts: TrackingService) => {
  trackingService = ts;
};

// (Removed local map)

export const createAndAssignDelivery = async (req: Request, res: Response) => {
  try {
    const { orderId, pickupCoords, dropoffCoords, fee } = req.body;
    
    const deliveryData = {
      _id: 'MOCK_' + Math.random().toString(36).substr(2, 9),
      orderId,
      fee,
      partnerEarnings: fee * 0.8,
      pickupLocation: { type: 'Point', coordinates: pickupCoords },
      dropoffLocation: { type: 'Point', coordinates: dropoffCoords },
      status: 'assigned',
      partnerId: 'mock_driver_123',
      createdAt: new Date()
    };

    try {
      const delivery = new Delivery(deliveryData);
      await delivery.save();
      console.log('✅ Stored in MongoDB');
    } catch (dbError) {
      console.log('⚠️ MongoDB fail, using in-memory fallback');
      mockDeliveries.set(deliveryData._id, deliveryData);
    }

    // Start simulation engine immediately
    trackingService.startMockDriverMovement(deliveryData._id);
    
    res.json({
      success: true,
      message: 'Delivery assigned and partner dispatched (Mock Mode Active)',
      deliveryId: deliveryData._id
    });

  } catch (error) {
    console.error('Assign delivery error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getDeliveryStatus = async (req: Request, res: Response) => {
  try {
    let delivery = mockDeliveries.get(req.params.id);
    
    if (!delivery) {
      try {
        delivery = await Delivery.findById(req.params.id);
      } catch (dbError) {
        // Silent fallthrough to 404
      }
    }

    if (!delivery) return res.status(404).json({ success: false, message: 'Not found' });
    
    res.json({ success: true, data: delivery });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
