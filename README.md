# Retail Store Dashboard

A full-stack retail management system with React frontend, Node.js/Express backend, and MySQL database.

## Features

- **User Authentication**: Registration and login with JWT tokens
- **Product Management**: Add, view, and manage inventory
- **User Management**: Manage staff accounts and roles
- **Sales Tracking**: Record and view sales transactions
- **Responsive UI**: Modern, dark-themed dashboard with animations

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI components
- Lucide React icons

### Backend
- Node.js with Express
- TypeScript
- MySQL with mysql2 driver
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Database
- MySQL 8.0+
- Tables: users, products, sales

## Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- Git

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd retailstore-dashboard
```

### 2. Database Setup
1. Start MySQL service
2. Open MySQL Workbench
3. Run the schema file:
```sql
-- Open server/sql/schema.retailstore_db.sql in MySQL Workbench
-- Execute the entire file to create database and tables
```

### 3. Backend Setup
```bash
cd server
npm install
```

Create `server/.env` file:
```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=retailstore_db
JWT_SECRET=your-secret-key-change-in-production
```

Start backend:
```bash
npm run dev
```

### 4. Frontend Setup
```bash
# From project root
npm install
npm run dev
```

## Usage

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Health Check: http://localhost:4000/api/health

### Authentication
1. **Registration**: Create new user accounts with validation
   - First Name: min 6 characters, letters only
   - Last Name: required
   - Email: valid email format
   - Password: min 6 characters
   - Mobile: exactly 10 digits
   - Address: required

2. **Login**: Use registered credentials to access dashboard

### Features Overview
- **Dashboard**: Overview with statistics and charts
- **Products**: Manage inventory (add, view products)
- **Users**: Manage staff accounts
- **Sales**: Record and track sales transactions
- **Reports**: View analytics and reports

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create new user

### Sales
- `GET /api/sales` - List all sales
- `POST /api/sales` - Record new sale

### Health
- `GET /api/health` - API health check

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    address TEXT,
    role ENUM('admin','staff') NOT NULL DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sales Table
```sql
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    sold_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Development

### Project Structure
```
retailstore-dashboard/
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── utils/             # Utility functions
│   └── main.tsx           # App entry point
├── server/                # Backend Node.js app
│   ├── src/               # Backend source code
│   ├── sql/               # Database schema
│   └── package.json       # Backend dependencies
├── package.json           # Frontend dependencies
└── vite.config.ts         # Vite configuration
```

### Scripts
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd server
npm run dev          # Start with nodemon
npm run build        # Compile TypeScript
npm start            # Start production server
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation on frontend
- SQL injection protection with parameterized queries
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.