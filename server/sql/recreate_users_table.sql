-- Drop and recreate users table with correct schema
DROP TABLE IF EXISTS users;

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

-- Insert admin user with proper password hash
INSERT INTO users (name, email, password_hash, role)
VALUES ('Admin', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
