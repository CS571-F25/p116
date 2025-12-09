# Recipe App Backend

Node.js + Express backend for the Recipe Generator application with OpenAI integration.

## Features

- **Recipe Generation**: Uses OpenAI GPT to generate creative recipes from ingredients
- **User Authentication**: JWT-based authentication system
- **Recipe Management**: Save, retrieve, and delete recipes
- **User Preferences**: Store and manage cooking preferences
- **MongoDB Integration**: Persistent data storage

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API Key

## Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` and add your values:
- `MONGODB_URI`: Your MongoDB connection string
- `OPENAI_API_KEY`: Your OpenAI API key
- `JWT_SECRET`: A secure random string for JWT signing

3. **Start MongoDB** (if using local MongoDB)
```bash
# macOS with Homebrew
brew services start mongodb-community

# or directly
mongod --dbpath /path/to/data
```

4. **Run the Server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Recipes
- `POST /api/recipes/generate` - Generate recipes from ingredients (protected)
- `POST /api/recipes/save` - Save a recipe (protected)
- `GET /api/recipes/saved` - Get saved recipes (protected)
- `GET /api/recipes/:id` - Get specific recipe (protected)
- `DELETE /api/recipes/:id` - Delete recipe (protected)

### Preferences
- `GET /api/preferences` - Get user preferences (protected)
- `PUT /api/preferences` - Update preferences (protected)
- `POST /api/preferences/reset` - Reset to defaults (protected)

## Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Custom middleware (auth, error handling)
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic (OpenAI integration)
└── server.js        # Entry point
```

## MongoDB Setup

### Option 1: Local MongoDB
Install MongoDB locally and run it on the default port (27017).

### Option 2: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string and add it to `.env`

## OpenAI API Key

1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys section
3. Create a new API key
4. Add it to your `.env` file

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify network access if using MongoDB Atlas

### OpenAI API Error
- Verify your API key is correct
- Check your OpenAI account has credits
- The app will use fallback recipes if OpenAI fails

### Port Already in Use
Change the `PORT` in your `.env` file to use a different port.

