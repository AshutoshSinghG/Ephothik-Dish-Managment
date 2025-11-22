import Dish from '../models/Dish.js';

/**
 * @desc    Get all dishes
 * @route   GET /api/dishes
 * @access  Public
 * @returns All dishes sorted by dishName
 */
export const getDishes = async (req, res) => {
  try {
    // Fetch all dishes and sort by dishName (ascending)
    const dishes = await Dish.find({}).sort({ dishName: 1 });

    res.status(200).json({
      success: true,
      count: dishes.length,
      data: dishes,
    });
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dishes',
      error: error.message,
    });
  }
};

/**
 * @desc    Create a new dish
 * @route   POST /api/dishes
 * @access  Public
 * @body    {string} dishId, {string} dishName, {string} imageUrl, {boolean} isPublished
 * @returns Created dish object
 */
export const createDish = async (req, res) => {
  try {
    const { dishId, dishName, imageUrl, isPublished } = req.body;

    // Validate required fields
    if (!dishId || !dishName || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide dishId, dishName, and imageUrl',
      });
    }

    // Check if dishId already exists
    const existingDish = await Dish.findOne({ dishId });
    if (existingDish) {
      return res.status(400).json({
        success: false,
        message: `Dish with ID ${dishId} already exists`,
      });
    }

    // Create new dish
    const dish = await Dish.create({
      dishId,
      dishName,
      imageUrl,
      isPublished: isPublished || false,
    });

    // Emit socket event for real-time updates
    if (req.io) {
      req.io.emit('dish-created', {
        dish: dish,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Dish created successfully',
      data: dish,
    });
  } catch (error) {
    console.error('Error creating dish:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating dish',
      error: error.message,
    });
  }
};

/**
 * @desc    Update a dish
 * @route   PUT /api/dishes/:dishId
 * @access  Public
 * @param   {string} dishId - The dish ID to update
 * @body    {string} dishName, {string} imageUrl, {boolean} isPublished
 * @returns Updated dish object
 */
export const updateDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const { dishName, imageUrl, isPublished } = req.body;

    // Find the dish by dishId
    const dish = await Dish.findOne({ dishId });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: `Dish with ID ${dishId} not found`,
      });
    }

    // Update fields if provided
    if (dishName !== undefined) dish.dishName = dishName;
    if (imageUrl !== undefined) dish.imageUrl = imageUrl;
    if (isPublished !== undefined) dish.isPublished = isPublished;

    await dish.save();

    // Emit socket event for real-time updates
    if (req.io) {
      req.io.emit('dish-updated', {
        dishId: dish.dishId,
        dish: dish,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Dish updated successfully',
      data: dish,
    });
  } catch (error) {
    console.error('Error updating dish:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating dish',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a dish
 * @route   DELETE /api/dishes/:dishId
 * @access  Public
 * @param   {string} dishId - The dish ID to delete
 * @returns Success message
 */
export const deleteDish = async (req, res) => {
  try {
    const { dishId } = req.params;

    // Find and delete the dish
    const dish = await Dish.findOneAndDelete({ dishId });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: `Dish with ID ${dishId} not found`,
      });
    }

    // Emit socket event for real-time updates
    if (req.io) {
      req.io.emit('dish-deleted', {
        dishId: dishId,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Dish deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Error deleting dish:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting dish',
      error: error.message,
    });
  }
};

/**
 * @desc    Toggle publish status of a dish
 * @route   PUT /api/dishes/:dishId/toggle
 * @access  Public
 * @param   {string} dishId - The dish ID to toggle
 * @returns Updated dish object
 */
export const togglePublishStatus = async (req, res) => {
  try {
    const { dishId } = req.params;

    // Find the dish by dishId
    const dish = await Dish.findOne({ dishId });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: `Dish with ID ${dishId} not found`,
      });
    }

    // Toggle the isPublished status
    dish.isPublished = !dish.isPublished;
    await dish.save();

    // Emit socket event for real-time updates
    // The socket instance will be attached to req.io by middleware
    if (req.io) {
      req.io.emit('publish-status-updated', {
        dishId: dish.dishId,
        isPublished: dish.isPublished,
        dish: dish,
      });
    }

    res.status(200).json({
      success: true,
      message: `Dish ${dish.isPublished ? 'published' : 'unpublished'} successfully`,
      data: dish,
    });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling publish status',
      error: error.message,
    });
  }
};

