import dotenv = require("dotenv");
import mysql from "mysql2/promise";

dotenv.config();

const databaseHost = process.env.DB_HOST || "localhost";
const databasePort = Number(process.env.DB_PORT || 3306);
const databaseUser = process.env.DB_USER || "root";
const databasePassword = process.env.DB_PASSWORD || "";
const databaseName = process.env.DB_NAME || "retail_store";

export const connectionPool = mysql.createPool({
	host: databaseHost,
	port: databasePort,
	user: databaseUser,
	password: databasePassword,
	database: databaseName,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

export async function runHealthCheck(): Promise<boolean> {
	try {
		const connection = await connectionPool.getConnection();
		await connection.ping();
		connection.release();
		return true;
	} catch (_error) {
		return false;
	}
}

export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T[]> {
	const [rows] = await connectionPool.query(sql, params);
	return rows as T[];
}


