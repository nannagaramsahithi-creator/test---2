import mongoose from 'mongoose';

const lostItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an item name'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      trim: true,
      default: 'Personal Belongings',
    },
    location: {
      type: String,
      required: [true, 'Please specify the lost location or campus landmark'],
      trim: true,
    },
    dateTime: {
      type: String,
      trim: true,
      default: '',
    },
    contact: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['lost', 'matched', 'recovered'],
      default: 'lost',
    },
  },
  {
    timestamps: true,
  }
);

const LostItem = mongoose.model('LostItem', lostItemSchema);

export default LostItem;
