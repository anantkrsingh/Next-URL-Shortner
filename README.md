# URL Shortener

A modern, full-stack URL shortener built with Next.js, MongoDB, Redis, and Prisma. This application allows users to create short URLs with custom aliases, track click analytics, and provides a clean API for integration.

## Features

- ✅ URL shortening with unique 6-character codes
- ✅ Custom alias support
- ✅ Click tracking and analytics
- ✅ Duplicate URL detection
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ MongoDB integration with Prisma ORM
- ✅ Redis caching for improved performance
- ✅ Firebase Analytics integration
- ✅ Docker & Docker Compose support
- ✅ RESTful API endpoints
- ✅ Automatic redirection via middleware

## Project Structure

```
url-shortner/
├── src/
│   ├── app/
│   │   ├── [id]/                    # Dynamic route for short URLs
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── [shortCode]/         # API route for URL redirection
│   │   │   │   └── route.ts
│   │   │   └── shorten/             # API route for creating short URLs
│   │   │       └── route.ts
│   │   ├── api-docs/                # API documentation page
│   │   │   └── page.tsx
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout component
│   │   └── page.tsx                 # Homepage
│   ├── components/
│   │   ├── Analytics.tsx            # Firebase Analytics component
│   │   ├── api-docs-client.tsx      # API docs client component
│   │   └── short.tsx                # URL shortening form component
│   ├── lib/
│   │   ├── firebase.ts              # Firebase configuration
│   │   ├── prisma.ts                # Prisma client configuration
│   │   └── utils.ts                 # Utility functions
│   └── middleware.ts                # Next.js middleware for URL redirection
├── prisma/
│   └── schema.prisma                # Database schema
├── generated/
│   └── prisma/                      # Generated Prisma client
├── public/                          # Static assets
├── docker-compose.yml               # Docker Compose configuration
├── Dockerfile                       # Docker configuration
├── package.json                     # Dependencies and scripts
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md
```

## Prerequisites

- Node.js 18+ (for local development)
- Docker & Docker Compose (for containerized deployment)
- MongoDB (local or cloud instance)
- Redis (for caching)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="mongodb://localhost:27017/url-shortener"
# For production with MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/url-shortener?retryWrites=true&w=majority"

# Redis Configuration
REDIS_URL="redis://localhost:6379"
# For production with Redis Cloud:
# REDIS_URL="redis://username:password@host:port"

# Firebase Configuration (Optional - for analytics)
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"

# Application Configuration
NODE_ENV="development"
```

## Getting Started

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortner
   ```

2. **Create environment file**
   ```bash
   # Create .env file with the following content:
   cat > .env << 'EOF'
   DATABASE_URL="mongodb://mongo:27017/url-shortener"
   REDIS_URL="redis://redis:6379"
   NODE_ENV="production"
   EOF
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Application: http://localhost:3000
   - MongoDB: localhost:27017
   - Redis: localhost:6379

### Option 2: Local Development

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables**
   ```bash
   # Create .env file with your configuration
   cat > .env << 'EOF'
   DATABASE_URL="mongodb://localhost:27017/url-shortener"
   REDIS_URL="redis://localhost:6379"
   NODE_ENV="development"
   EOF
   ```

3. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

4. **Push database schema**
   ```bash
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Create Short URL
```http
POST /api/shorten
Content-Type: application/json

{
  "url": "https://example.com",
  "customAlias": "optional-custom-alias"
}
```

**Response:**
```json
{
  "success": true,
  "shortUrl": "https://yourdomain.com/abc123",
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "clicks": 0
}
```

### Redirect to Original URL
```http
GET /api/{shortCode}
```

**Response:** HTTP 302 redirect to the original URL

### Get URL Analytics
```http
GET /api/analytics/{shortCode}
```

**Response:**
```json
{
  "shortCode": "abc123",
  "originalUrl": "https://example.com",
  "clicks": 42,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastClicked": "2024-01-15T12:30:00.000Z"
}
```

## Docker Commands

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Stop and remove volumes
docker-compose down -v
```

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Run linting
npm run lint

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## Database Schema

The application uses MongoDB with the following schema:

```prisma
model Url {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  originalUrl String
  shortCode   String   @unique
  customAlias String?  @unique
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  clicks      Int      @default(0)

  @@map("urls")
}
```

## Deployment

### Using Docker Compose

1. Set up your production environment variables
2. Run `docker-compose up -d`
3. Configure your reverse proxy (nginx, traefik, etc.)

### Using Vercel

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
