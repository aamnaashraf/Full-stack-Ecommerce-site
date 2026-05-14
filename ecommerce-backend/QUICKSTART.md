# Quick Start Guide - Backend Setup

## Prerequisites
- Python 3.10 or higher installed
- Neon PostgreSQL account (free tier)

## Step 1: Get Your Neon Database Connection String

1. Go to https://console.neon.tech/
2. Sign in or create a free account
3. Create a new project (or use existing)
4. Copy your connection string - it looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

## Step 2: Configure Environment

1. Open `ecommerce-backend/.env` file
2. Replace the DATABASE_URL with your Neon connection string:
   ```env
   DATABASE_URL=postgresql://your-actual-connection-string-here
   CORS_ORIGINS=http://localhost:3000
   ```

## Step 3: Install Dependencies

Open terminal in the `ecommerce-backend` folder:

```bash
cd ecommerce-backend
pip install -r requirements.txt
```

## Step 4: Start the Server

```bash
uvicorn app.main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

## Step 5: Seed the Database

Open a NEW terminal (keep the server running) and run:

```bash
cd ecommerce-backend
python seed_data.py
```

You should see:
```
Successfully seeded 27 products!
```

## Step 6: Test the API

Open your browser and visit:
- **Interactive Docs**: http://localhost:8000/docs
- **API Root**: http://localhost:8000
- **Health Check**: http://localhost:8000/health

### Test in Swagger UI:
1. Go to http://localhost:8000/docs
2. Click on "GET /api/products"
3. Click "Try it out"
4. Click "Execute"
5. You should see all 27 products!

## Troubleshooting

### Error: "No module named 'app'"
- Make sure you're in the `ecommerce-backend` directory
- Run: `pip install -r requirements.txt`

### Error: "Could not connect to database"
- Check your DATABASE_URL in `.env` file
- Make sure your Neon database is active
- Verify the connection string is correct

### Error: "Port 8000 already in use"
- Use a different port: `uvicorn app.main:app --reload --port 8001`
- Or stop the process using port 8000

## Next Steps

Once the backend is running:
1. Keep the server running
2. Tomorrow we'll add authentication
3. Then connect the frontend to this backend

## Quick Commands Reference

```bash
# Start server
uvicorn app.main:app --reload --port 8000

# Seed database
python seed_data.py

# Install dependencies
pip install -r requirements.txt
```
