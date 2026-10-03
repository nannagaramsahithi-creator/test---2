import LostItem from '../models/LostItem.js';

// @desc    Create a new lost item report
// @route   POST /api/lost-items
// @access  Public
export const createLostItem = async (req, res, next) => {
  try {
    const {
      title,
      category,
      location,
      dateTime,
      contact,
      description,
      imageUrl,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Item title/name is required',
      });
    }

    if (!location || !location.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Lost location is required',
      });
    }

    const lostItem = await LostItem.create({
      title: title.trim(),
      category: category || 'Personal Belongings',
      location: location.trim(),
      dateTime: dateTime ? dateTime.trim() : '',
      contact: contact ? contact.trim() : '',
      description: description ? description.trim() : '',
      imageUrl: imageUrl ? imageUrl.trim() : '',
      status: 'lost',
    });

    res.status(201).json({
      success: true,
      message: 'Lost item report created successfully',
      data: lostItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all lost item reports
// @route   GET /api/lost-items
// @access  Public
export const getLostItems = async (req, res, next) => {
  try {
    const lostItems = await LostItem.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: lostItems.length,
      data: lostItems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single lost item report by ID
// @route   GET /api/lost-items/:id
// @access  Public
export const getLostItemById = async (req, res, next) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: `Lost item report not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: lostItem,
    });
  } catch (error) {
    next(error);
  }
};
