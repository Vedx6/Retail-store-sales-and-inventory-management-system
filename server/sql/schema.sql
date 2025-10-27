-- Create database (run once; adjust as needed)
CREATE DATABASE IF NOT EXISTS retail_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE retail_store;

-- Users table
CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	mobile VARCHAR(20),
	address TEXT,
	role ENUM('admin','staff') NOT NULL DEFAULT 'staff',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	sku VARCHAR(100) NOT NULL UNIQUE,
	price DECIMAL(10,2) NOT NULL,
	stock INT NOT NULL DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
	id INT AUTO_INCREMENT PRIMARY KEY,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	total_amount DECIMAL(10,2) NOT NULL,
	sold_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Seed (optional)
INSERT INTO users (name, email, password_hash, role)
VALUES ('Admin', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO products (name, sku, price, stock)
VALUES ('Sample Product', 'SKU-001', 19.99, 100)
ON DUPLICATE KEY UPDATE name=VALUES(name), price=VALUES(price), stock=VALUES(stock);


