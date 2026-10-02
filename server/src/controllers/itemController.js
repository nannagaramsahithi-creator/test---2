import Item from '../models/Item.js';

// @desc    Get all items
// @route   GET /api/items
// @access  Public
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Public
export const createItem = async (req, res, next) => {
  try {
    const { title, description, status, category } = req.body;
    const item = await Item.create({ title, description, status, category });
    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Public
export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Public
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
