import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MenuItem } from './models/menu.model';

dotenv.config();

const dummyItems = [
  {
    vendorId: 'vendor_canteen_1',
    name: "Classic Maggi",
    description: "Midnight lifesaver. Hot & spicy.",
    price: 40,
    category: "snacks",
    images: [],
    isVeg: true,
    isAvailable: true,
    preparationTime: 5,
    rating: 4.8
  },
  {
    vendorId: 'vendor_canteen_1',
    name: "Cold Coffee",
    description: "Perfect for late night grinds.",
    price: 60,
    category: "beverages",
    images: [],
    isVeg: true,
    isAvailable: true,
    preparationTime: 3,
    rating: 4.5
  },
  {
    vendorId: 'vendor_canteen_2',
    name: "Chicken Roll",
    description: "Crispy paratha filled with juicy chicken.",
    price: 90,
    category: "snacks",
    images: [],
    isVeg: false,
    isAvailable: true,
    preparationTime: 10,
    rating: 4.9
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ Connected to MongoDB for Seeding');

    // Wipe existing menu items
    await MenuItem.deleteMany({});
    console.log('🗑️ Wiped existing menu items');

    // Insert new dummy items
    await MenuItem.insertMany(dummyItems);
    console.log('🌱 Seeded new dummy items successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
