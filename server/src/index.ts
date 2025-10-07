import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");
import { apiRouter } from "./routes";
import { runHealthCheck } from "./db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
	const ok = await runHealthCheck();
	res.json({ ok });
});

app.use("/api", apiRouter);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
	console.log(`API listening on http://localhost:${port}`);
});


