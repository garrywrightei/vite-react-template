import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.post("/api/test", async (c) => {
	const body = await c.req.json();
	console.log("Received data:", body);
	console.log("Data payload:", body.data);

	// Get ENV_DATA from environment variables
	const envData = c.env.ENV_DATA || "No ENV_DATA set";

	const timestamp = new Date().toISOString();
	const formattedTime = new Date().toLocaleString('en-US', {
		dateStyle: 'medium',
		timeStyle: 'long'
	});

	return c.json({
		success: true,
		message: `✓ Data received and logged successfully!`,
		data: body.data,
		envData: envData,
		timestamp: timestamp,
		formattedTimestamp: formattedTime,
		dataLength: body.data?.length || 0
	});
});

export default app;
