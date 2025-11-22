import mongoose from 'mongoose';

/**
 * Dish Schema
 * Represents a dish in the database with all required fields
 */
const dishSchema = new mongoose.Schema(
  {
    dishId: {
      type: String,
      required: [true, 'Dish ID is required'],
      unique: true,
      trim: true,
      index: true, // Index for faster queries
    },
    dishName: {
      type: String,
      required: [true, 'Dish name is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false, // Default to unpublished
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create model from schema
const Dish = mongoose.model('Dish', dishSchema);

export default Dish;

