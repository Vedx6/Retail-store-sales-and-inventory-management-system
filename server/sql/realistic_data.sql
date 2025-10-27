-- Create database (run once; adjust as needed)
CREATE DATABASE IF NOT EXISTS retail_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE retail_store;

-- Users table
CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
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

-- Clear existing data
DELETE FROM sales;
DELETE FROM products;
DELETE FROM users;

-- Insert realistic users
INSERT INTO users (name, email, role) VALUES 
('John Smith', 'admin@retailstore.com', 'admin'),
('Sarah Johnson', 'sarah@retailstore.com', 'staff'),
('Michael Brown', 'michael@retailstore.com', 'staff');

-- Insert realistic products
INSERT INTO products (name, sku, price, stock) VALUES 
('Samsung Galaxy S23', 'TECH-1001', 899.99, 45),
('Apple iPhone 15', 'TECH-1002', 999.99, 32),
('Dell XPS 15 Laptop', 'TECH-1003', 1299.99, 18),
('Sony WH-1000XM5 Headphones', 'TECH-1004', 349.99, 27),
('LG 55" OLED TV', 'TECH-1005', 1499.99, 12),
('Logitech MX Master Mouse', 'TECH-1006', 99.99, 50),
('Kindle Paperwhite', 'TECH-1007', 139.99, 35),
('Nintendo Switch OLED', 'TECH-1008', 349.99, 22),
('Canon EOS R6 Camera', 'TECH-1009', 2499.99, 8),
('Bose QuietComfort Earbuds', 'TECH-1010', 279.99, 30);

-- Insert realistic sales with proper timestamps
INSERT INTO sales (product_id, quantity, total_amount, sold_at) VALUES 
(1, 2, 1799.98, DATE_SUB(NOW(), INTERVAL 10 DAY)),
(3, 1, 1299.99, DATE_SUB(NOW(), INTERVAL 9 DAY)),
(5, 1, 1499.99, DATE_SUB(NOW(), INTERVAL 8 DAY)),
(2, 3, 2999.97, DATE_SUB(NOW(), INTERVAL 7 DAY)),
(4, 2, 699.98, DATE_SUB(NOW(), INTERVAL 6 DAY)),
(7, 4, 559.96, DATE_SUB(NOW(), INTERVAL 5 DAY)),
(10, 2, 559.98, DATE_SUB(NOW(), INTERVAL 4 DAY)),
(8, 1, 349.99, DATE_SUB(NOW(), INTERVAL 3 DAY)),
(6, 5, 499.95, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(9, 1, 2499.99, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(1, 1, 899.99, DATE_SUB(NOW(), INTERVAL 12 HOUR)),
(2, 2, 1999.98, DATE_SUB(NOW(), INTERVAL 8 HOUR)),
(4, 3, 1049.97, DATE_SUB(NOW(), INTERVAL 4 HOUR)),
(6, 2, 199.98, DATE_SUB(NOW(), INTERVAL 2 HOUR));