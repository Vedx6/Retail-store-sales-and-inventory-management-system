Backend API (Express + MySQL)

Setup

1. Copy env file:
   On Windows PowerShell:
   Copy-Item .env.example .env
   On macOS/Linux:
   cp .env.example .env
   Then edit DB credentials.

2. Install deps and run:
   npm install
   npm run dev

3. Create database and tables using the SQL in sql/schema.sql

Environment variables

- PORT: API port (default 4000)
- DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME

Endpoints

- GET /api/health
- GET /api/products
- POST /api/products
- GET /api/users
- GET /api/sales


