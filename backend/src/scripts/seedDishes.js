import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Dish from '../models/Dish.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

/**
 * Seed the database with dishes from dishes.json
 * This script populates the MongoDB collection with initial data
 */
const seedDishes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read dishes data from JSON file
    const dishesPath = join(__dirname, '../../data/dishes.json');
    const dishesData = JSON.parse(readFileSync(dishesPath, 'utf-8'));

    // Clear existing dishes (optional - comment out if you want to keep existing data)
    await Dish.deleteMany({});
    console.log('🗑️  Cleared existing dishes');

    // Insert dishes into database
    const dishes = await Dish.insertMany(dishesData);
    console.log(`✅ Seeded ${dishes.length} dishes successfully`);

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding dishes:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDishes();

