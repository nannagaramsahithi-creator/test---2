import mongoose from 'mongoose';

/**
 * Connects to MongoDB Atlas / Local MongoDB instance
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn('\n⚠️  [MongoDB Warning]: MONGODB_URI is not configured with real Atlas credentials.');
    console.warn('👉 Please update server/.env with your MongoDB Atlas connection string.\n');
  }

  try {
    const conn = await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/mern_db');
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('\nAtlas Troubleshooting Tips:');
    console.error(' 1. Check if IP 0.0.0.0/0 (or your current IP) is allowed in Atlas Network Access');
    console.error(' 2. Verify your Atlas database user credentials in server/.env');
    console.error(' 3. Ensure database user has "readWriteAnyDatabase" or access to your database\n');
    // In production, exit process on failure; in dev, keep server running to allow client testing
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting reconnection...');
});

export default connectDB;
