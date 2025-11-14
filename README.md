# Library Management System

A modern library management system built with Node.js, Express, Redis, WebSocket, and MongoDB.

## Tech Stack

- **Node.js + Express** - Backend API
- **Redis** - Caching, Queue, Pub/Sub
- **MongoDB + Mongoose** - Database
- **WebSocket (ws)** - Real-time communication
- **Docker** - Containerization

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start Redis and MongoDB:
```bash
docker-compose up -d
```

3. Start the server:
```bash
npm run dev
```

## Project Structure

```
├── config/          # Configuration files
├── services/        # Microservices
├── middleware/      # Express middleware
├── utils/          # Utility functions
├── server.js       # Main API Gateway
└── docker-compose.yml
```

## Features Implemented (Phase 1)

✅ Project setup with Node.js + Express  
✅ Redis connection using createClient  
✅ Redis caching service  
✅ Cache middleware for Express routes  
✅ Docker containers for Redis & MongoDB  
✅ API Gateway server  
✅ Cache warming utilities  

## API Endpoints

- `GET /` - API Gateway status
- `GET /health` - Health check

## Environment Variables

```
PORT=3000
REDIS_URL=redis://localhost:6379
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```