import { Server } from 'socket.io';
import { Delivery } from '../models/delivery.model';
import { mockDeliveries } from './mockStorage';

export class TrackingService {
  private io: Server;
  // Store active mock intervals so we can clear them when order is delivered
  private activeSimulations: Map<string, NodeJS.Timeout> = new Map();

  constructor(io: Server) {
    this.io = io;
  }

  /**
   * Starts a mock simulation of a driver moving from pickup to dropoff.
   * Emits websocket events every 2 seconds.
   */
  public async startMockDriverMovement(deliveryId: string) {
    if (this.activeSimulations.has(deliveryId)) return;

    try {
      let delivery = mockDeliveries.get(deliveryId);
      
      if (!delivery) {
        try {
          delivery = await Delivery.findById(deliveryId);
        } catch (dbError) {
          console.warn('⚠️ MongoDB failed to fetch delivery for tracking, checking mock storage...');
        }
      }

      if (!delivery) {
        console.error('❌ Delivery not found in MongoDB or Mock Storage:', deliveryId);
        return;
      }

      const start = delivery.pickupLocation.coordinates; // [lng, lat]
      const end = delivery.dropoffLocation.coordinates;
      
      let currentLng = start[0];
      let currentLat = start[1];
      
      const steps = 30; // 60 seconds total if interval is 2s
      const lngStep = (end[0] - start[0]) / steps;
      const latStep = (end[1] - start[1]) / steps;
      
      let currentStep = 0;

      // Update status
      delivery.status = 'in_transit';
      mockDeliveries.set(deliveryId, delivery);
      
      try {
        await Delivery.updateOne({ _id: deliveryId }, { status: 'in_transit' });
      } catch (e) { /* ignore db errors */ }
      
      this.io.to(`delivery_${deliveryId}`).emit('status_update', { 
        deliveryId, 
        status: 'in_transit',
        message: 'Partner is on the way.'
      });

      const interval = setInterval(async () => {
        currentStep++;
        currentLng += lngStep;
        currentLat += latStep;

        // 1. Emit live socket event
        this.io.to(`delivery_${deliveryId}`).emit('location_update', {
          deliveryId,
          lat: currentLat,
          lng: currentLng,
          progress: Math.round((currentStep / steps) * 100)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          this.activeSimulations.delete(deliveryId);
          
          // Complete delivery
          delivery.status = 'delivered';
          mockDeliveries.set(deliveryId, delivery);
          
          try {
            await Delivery.updateOne({ _id: deliveryId }, { status: 'delivered' });
          } catch (e) { /* ignore db errors */ }
          
          this.io.to(`delivery_${deliveryId}`).emit('status_update', {
            deliveryId,
            status: 'delivered',
            message: 'Order has been delivered!'
          });
        }
      }, 2000);

      this.activeSimulations.set(deliveryId, interval);

    } catch (error) {
      console.error('Error in mock tracking:', error);
    }
  }
}
