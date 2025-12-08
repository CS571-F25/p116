# Quick Start Guide 🚀

## First Time Setup (5 minutes)

### 1. Configure Backend Environment
```bash
# Copy and edit backend environment file
cp backend/env-template.txt backend/.env
```

Edit `backend/.env` and set these three values:
```env
MONGODB_URI=mongodb://localhost:27017/recipe-app
OPENAI_API_KEY=sk-your-key-here
JWT_SECRET=any-random-string-here
```

### 2. Configure Frontend Environment
```bash
# Copy frontend environment file
cp env-template.txt .env
```

(No changes needed unless using different port)

### 3. Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Or use MongoDB Atlas (cloud) - see SETUP.md
```

### 4. Start Development Servers

**Option A - Easy way:**
```bash
./start-dev.sh
```

**Option B - Manual way:**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend (from project root)
npm run dev
```

### 5. Use the App
1. Open http://localhost:5173
2. Click "Register" to create account
3. Enter ingredients and generate recipes!

---

## Where to Get Required Keys

### MongoDB
**Free Option:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Sign up → Create cluster → Get connection string
- Or use local: `mongodb://localhost:27017/recipe-app`

### OpenAI API Key
**Get it here:** [OpenAI Platform](https://platform.openai.com/api-keys)
- Sign up → Create API key → Copy to .env
- Note: Costs ~$0.01-0.02 per recipe generation
- App has fallback recipes if key is invalid

---

## Project Ports

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:5173    |
| Backend  | http://localhost:3001    |
| MongoDB  | mongodb://localhost:27017|

---

## Troubleshooting

### ❌ Can't connect to backend
- Check backend terminal for errors
- Verify backend is running on port 3001
- Check `.env` has correct `VITE_API_URL`

### ❌ MongoDB connection failed
- Ensure MongoDB is running: `mongosh`
- Check `MONGODB_URI` in `backend/.env`
- Try Atlas if local MongoDB won't start

### ❌ OpenAI errors
- Verify API key is correct
- Check you have credits
- App will use fallback recipes if API fails

### ❌ Stuck on login page
- Open browser console for errors
- Clear browser localStorage
- Check both servers are running

---

## Development Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd backend
npm run dev          # Start with auto-reload
npm start            # Start without auto-reload
```

---

## API Endpoints Quick Reference

```
POST   /api/auth/register          # Create account
POST   /api/auth/login             # Login
GET    /api/auth/me                # Get current user

POST   /api/recipes/generate       # Generate recipes
POST   /api/recipes/save           # Save recipe
GET    /api/recipes/saved          # Get saved recipes
DELETE /api/recipes/:id            # Delete recipe

GET    /api/preferences            # Get preferences
PUT    /api/preferences            # Update preferences
POST   /api/preferences/reset      # Reset preferences
```

All recipe and preference endpoints require authentication (Bearer token).

---

## Need More Help?

- **Full Setup**: Read `SETUP.md`
- **Implementation Details**: Read `BACKEND_IMPLEMENTATION.md`
- **Backend API**: Read `backend/README.md`

---

## Default Test Account

For testing, create any account:
- Email: `test@example.com`
- Password: `123456` (or any 6+ chars)

No email verification required!

