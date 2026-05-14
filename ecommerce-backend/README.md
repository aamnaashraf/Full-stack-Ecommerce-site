# E-Commerce Backend API

FastAPI backend for E-Commerce website with PostgreSQL (Neon) database.

## Setup Instructions

### 1. Install Dependencies

```bash
cd ecommerce-backend
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file in the `ecommerce-backend` directory:

```env
DATABASE_URL=postgresql://username:password@host/database
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

Replace the `DATABASE_URL` with your Neon PostgreSQL connection string.

### 3. Run Database Migrations

The database tables will be created automatically on first run.

### 4. Seed Database

```bash
python seed_data.py
```

This will populate your database with 27 sample products.

### 5. Start Development Server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

## API Endpoints

### Products

- `GET /api/products` - Get all products (with optional filters)
  - Query params: `skip`, `limit`, `category`, `search`
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create product (admin only - auth coming tomorrow)
- `PUT /api/products/{id}` - Update product (admin only)
- `DELETE /api/products/{id}` - Delete product (admin only)

### Health Check

- `GET /` - API info
- `GET /health` - Health check

## Project Structure

```
ecommerce-backend/
├── app/
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   ├── routes/          # API endpoints
│   ├── auth/            # Authentication (coming tomorrow)
│   ├── config.py        # Settings
│   ├── database.py      # Database connection
│   └── main.py          # FastAPI app
├── seed_data.py         # Database seeding script
├── requirements.txt     # Python dependencies
└── .env                 # Environment variables
```

## Testing

Visit http://localhost:8000/docs to test all endpoints interactively using Swagger UI.

## Next Steps (Tomorrow)

- [ ] Add JWT authentication
- [ ] Add user registration/login
- [ ] Protect admin routes
- [ ] Add user model
