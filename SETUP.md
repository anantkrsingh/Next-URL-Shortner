# URL Shortener Setup Guide

## Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory with:
```
DATABASE_URL="mongodb://localhost:27017/url-shortener"
```

For production with MongoDB Atlas:
```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/url-shortener?retryWrites=true&w=majority"
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Push Database Schema
```bash
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

## Features
- ✅ URL shortening with unique 6-character codes
- ✅ Automatic redirection via middleware
- ✅ Click tracking
- ✅ Duplicate URL detection
- ✅ Modern, responsive UI
- ✅ MongoDB integration with Prisma

## API Endpoints
- `POST /api/shorten` - Create a short URL
- `GET /api/[shortCode]` - Redirect to original URL (also handled by middleware)

## How It Works
1. User enters a URL on the homepage
2. System generates a unique 6-character code
3. URL and code are stored in MongoDB
4. When someone visits the short URL, middleware redirects them to the original URL
5. Click count is automatically incremented
