require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectRedis } = require('./config/redis');
const connectDB = require('./config/database');
const userService = require('./services/user-service');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API Gateway' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Service routes
app.use('/api/users', userService);

// Start server
const startServer = async () => {
  try {
    await connectRedis();
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`API Gateway running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();