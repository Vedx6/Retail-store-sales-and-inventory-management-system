import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { executeQuery } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

export function generateToken(userId: number): string {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export async function registerUser(userData: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobile: string;
	address: string;
}): Promise<{ id: number; email: string }> {
	// Check if email already exists
	const existing = await executeQuery(
		"SELECT id FROM users WHERE email = ?",
		[userData.email]
	);
	if (existing.length > 0) {
		throw new Error("Email already registered");
	}

	// Hash password and insert user
	const hashedPassword = await hashPassword(userData.password);
	const result = await executeQuery<any>(
		"INSERT INTO users (name, email, password_hash, mobile, address) VALUES (?, ?, ?, ?, ?)",
		[`${userData.firstName} ${userData.lastName}`, userData.email, hashedPassword, userData.mobile, userData.address]
	);

	return { id: (result as any).insertId, email: userData.email };
}

export async function loginUser(email: string, password: string): Promise<{ id: number; email: string; name: string }> {
	const users = await executeQuery<{ id: number; email: string; name: string; password_hash: string }>(
		"SELECT id, email, name, password_hash FROM users WHERE email = ?",
		[email]
	);

	if (users.length === 0) {
		throw new Error("Invalid email or password");
	}

	const user = users[0];
	if (!user) {
		throw new Error("Invalid email or password");
	}

	const isValid = await comparePassword(password, user.password_hash);
	if (!isValid) {
		throw new Error("Invalid email or password");
	}

	return { id: user.id, email: user.email, name: user.name };
}
