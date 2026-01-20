// src/App.tsx

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("unknown");
	const [testInput, setTestInput] = useState("");
	const [response, setResponse] = useState("");

	const handleSubmit = async () => {
		try {
			const res = await fetch("/api/test", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data: testInput }),
			});
			const result = await res.json();

			// Format the response nicely
			const formattedResponse = `${result.message}

📝 Your Data: "${result.data}"
🔧 ENV_DATA: "${result.envData}"
📊 Length: ${result.dataLength} characters
🕒 Time: ${result.formattedTimestamp}
⏱️  ISO: ${result.timestamp}`;

			setResponse(formattedResponse);
		} catch (error) {
			setResponse(`❌ Error: ${error}`);
		}
	};

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<a href="https://hono.dev/" target="_blank">
					<img src={honoLogo} className="logo cloudflare" alt="Hono logo" />
				</a>
				<a href="https://workers.cloudflare.com/" target="_blank">
					<img
						src={cloudflareLogo}
						className="logo cloudflare"
						alt="Cloudflare logo"
					/>
				</a>
			</div>
			<h1>Vite + React + Hono + Cloudflare</h1>
			<div className="card">
				<button
					onClick={() => setCount((count) => count + 1)}
					aria-label="increment"
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<div className="card">
				<button
					onClick={() => {
						fetch("/api/")
							.then((res) => res.json() as Promise<{ name: string }>)
							.then((data) => setName(data.name));
					}}
					aria-label="get name"
				>
					Name from API is: {name}
				</button>
				<p>
					Edit <code>worker/index.ts</code> to change the name
				</p>
			</div>
			<div className="card">
				<h2>Test Input & Response</h2>
				<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
					<input
						type="text"
						value={testInput}
						onChange={(e) => setTestInput(e.target.value)}
						placeholder="Enter test data..."
						style={{ padding: "8px", fontSize: "16px" }}
					/>
					<button onClick={handleSubmit} aria-label="submit test data">
						Send to Backend
					</button>
					{response && (
						<div
							style={{
								marginTop: "10px",
								padding: "15px",
								backgroundColor: response.startsWith("❌") ? "#3d1f1f" : "#1f3d2f",
								borderRadius: "8px",
								textAlign: "left",
								border: response.startsWith("❌") ? "1px solid #ff6b6b" : "1px solid #51cf66",
							}}
						>
							<pre
								style={{
									margin: "0",
									fontSize: "14px",
									fontFamily: "monospace",
									whiteSpace: "pre-wrap",
									lineHeight: "1.6",
									color: "#ffffff",
								}}
							>
								{response}
							</pre>
						</div>
					)}
				</div>
			</div>
			<p className="read-the-docs">Click on the logos to learn more</p>
		</>
	);
}

export default App;
