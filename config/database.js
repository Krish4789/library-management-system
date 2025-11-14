const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library_management';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully to:', uri);
    console.log('Database name:', mongoose.connection.db.databaseName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;