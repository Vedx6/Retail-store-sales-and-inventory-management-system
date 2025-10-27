import { Router, type Request, type Response } from "express";
import { executeQuery } from "./db";
import { registerUser, loginUser, generateToken } from "./auth";

export const apiRouter = Router();

// Products
apiRouter.get("/products", async (_req: Request, res: Response) => {
	const rows = await executeQuery(
		"SELECT id, name, sku, price, stock, created_at FROM products ORDER BY id DESC"
	);
	res.json(rows);
});

apiRouter.post("/products", async (req: Request, res: Response) => {
	const { name, sku, price, stock } = req.body ?? {};
	const result = await executeQuery<any>(
		"INSERT INTO products (name, sku, price, stock) VALUES (?,?,?,?)",
		[name, sku, price, stock]
	);
	res.status(201).json({ id: (result as any).insertId });
});

apiRouter.put("/products/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, sku, price, stock } = req.body ?? {};
		await executeQuery(
			"UPDATE products SET name = ?, sku = ?, price = ?, stock = ? WHERE id = ?",
			[name, sku, price, stock, id]
		);
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

apiRouter.delete("/products/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await executeQuery("DELETE FROM products WHERE id = ?", [id]);
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Users
apiRouter.get("/users", async (_req: Request, res: Response) => {
	const rows = await executeQuery(
		"SELECT id, name, email, role, created_at FROM users ORDER BY id DESC"
	);
	res.json(rows);
});

apiRouter.post("/users", async (req: Request, res: Response) => {
	const { name, email, role } = req.body ?? {};
	const result = await executeQuery<any>(
		"INSERT INTO users (name, email, role) VALUES (?,?,?)",
		[name, email, role ?? "staff"]
	);
	res.status(201).json({ id: (result as any).insertId });
});

apiRouter.put("/users/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, email, role } = req.body ?? {};
		await executeQuery(
			"UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
			[name, email, role, id]
		);
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

apiRouter.delete("/users/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await executeQuery("DELETE FROM users WHERE id = ?", [id]);
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Sales
apiRouter.get("/sales", async (_req: Request, res: Response) => {
	const rows = await executeQuery(
		"SELECT id, product_id, quantity, total_amount, sold_at FROM sales ORDER BY sold_at DESC"
	);
	res.json(rows);
});

apiRouter.post("/sales", async (req: Request, res: Response) => {
	const { product_id, quantity, total_amount } = req.body ?? {};
	const result = await executeQuery<any>(
		"INSERT INTO sales (product_id, quantity, total_amount) VALUES (?,?,?)",
		[product_id, quantity, total_amount]
	);
	res.status(201).json({ id: (result as any).insertId });
});

// Auth routes
apiRouter.post("/auth/register", async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password, mobile, address } = req.body ?? {};
		const user = await registerUser({ firstName, lastName, email, password, mobile, address });
		const token = generateToken(user.id);
		res.status(201).json({ token, user: { id: user.id, email: user.email } });
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
});

apiRouter.post("/auth/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body ?? {};
		const user = await loginUser(email, password);
		const token = generateToken(user.id);
		res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
	} catch (error) {
		res.status(401).json({ error: (error as Error).message });
	}
});


