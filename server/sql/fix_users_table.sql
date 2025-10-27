-- Add missing columns to existing users table
ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN mobile VARCHAR(20);
ALTER TABLE users ADD COLUMN address TEXT;

-- Update the existing admin user with a default password hash
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE email = 'admin@example.com';
