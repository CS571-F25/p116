# Recipe App - Full Setup Guide

Complete setup guide for the Recipe Generator application with Node.js backend.

## Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables

**Backend Configuration:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add:
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MongoDB (choose one)
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/recipe-app
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipe-app

# OpenAI API Key (get from https://platform.openai.com/)
OPENAI_API_KEY=your_openai_api_key_here

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
```

**Frontend Configuration:**
```bash
# In project root
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows - Download from mongodb.com and install
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user
4. Whitelist your IP (0.0.0.0/0 for development)
5. Get connection string and add to `backend/.env`

### 4. Get OpenAI API Key

1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys
3. Create new secret key
4. Copy and add to `backend/.env`

**Note:** The app has fallback recipes if OpenAI is unavailable, but you need an API key for AI-generated recipes.

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 6. Create Your First Account

1. Open `http://localhost:5173` in your browser
2. Click "Register" 
3. Create an account with email and password
4. Start generating recipes!

## Project Structure

```
recipe-app/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth & error handling
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # OpenAI integration
│   ├── package.json
│   └── server.js           # Entry point
│
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── context/            # Auth context
│   ├── services/           # API service layer
│   └── utils/              # Helper functions
│
├── package.json            # Frontend dependencies
└── vite.config.js          # Vite configuration
```

## Features

### ✅ Implemented
- User authentication (register/login)
- Recipe generation using OpenAI
- Save/unsave favorite recipes
- User preferences management
- Responsive design
- Protected routes
- Error handling
- Fallback recipes when API unavailable

### 🚀 Future Enhancements
- Password reset functionality
- Recipe sharing
- Recipe ratings and reviews
- Search and filter saved recipes
- Meal planning calendar
- Shopping list generation
- Nutrition information
- Recipe modifications

## Development

### Running Tests
```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
npm test
```

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
Backend runs the same in production, just set `NODE_ENV=production` in `.env`

### Deployment Options

**Frontend:**
- Vercel (recommended for Vite apps)
- Netlify
- GitHub Pages

**Backend:**
- Railway
- Render
- Fly.io
- AWS EC2
- DigitalOcean

**Database:**
- MongoDB Atlas (recommended)
- Self-hosted MongoDB

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongosh` or `mongo`
- Verify `.env` file exists in `backend/` directory
- Check port 3001 is available

### Frontend can't connect to backend
- Verify backend is running on port 3001
- Check CORS settings in `backend/server.js`
- Verify `VITE_API_URL` in frontend `.env`

### OpenAI errors
- Check API key is valid
- Verify you have credits in your OpenAI account
- Check rate limits
- Fallback recipes will be used if API fails

### MongoDB connection errors
- Local: Ensure MongoDB service is running
- Atlas: Check network access whitelist
- Verify connection string format

### Authentication issues
- Clear browser localStorage
- Check JWT_SECRET is set in backend `.env`
- Verify token expiration settings

## API Documentation

Full API documentation is available in the backend README: `backend/README.md`

## Support

For issues and questions:
1. Check this setup guide
2. Review error messages in console
3. Check browser Network tab for API calls
4. Review backend logs

## License

MIT

