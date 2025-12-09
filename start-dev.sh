#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Recipe App Development Server${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}⚠️  backend/.env not found!${NC}"
    echo "Creating from template..."
    cp backend/env-template.txt backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
    echo "⚠️  Please edit backend/.env and add your credentials"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo -e "${RED}⚠️  .env not found!${NC}"
    echo "Creating from template..."
    cp env-template.txt .env
    echo -e "${GREEN}✓ Created .env${NC}"
fi

# Check if node_modules exist
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing frontend dependencies...${NC}"
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo -e "${BLUE}Installing backend dependencies...${NC}"
    cd backend && npm install && cd ..
fi

echo ""
echo -e "${GREEN}Starting servers...${NC}"
echo -e "${GREEN}Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}Backend:  http://localhost:3001${NC}"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop both servers${NC}"
echo ""

# Start both servers in background
cd backend && npm run dev &
BACKEND_PID=$!

npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

