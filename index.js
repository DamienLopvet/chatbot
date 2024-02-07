import MistralClient from "@mistralai/mistralai";
import express from "express";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import "dotenv/config";

const app = express();

const port = 80;
const httpsPort = 443;

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

const apiKey = process.env.MISTRAL_API_KEY || "your_api_key";

const client = new MistralClient(apiKey);

app.get("/", async (req, res) => {
	console.log("checking get");
	res.status(200).json("workin'");
});

app.post("/api/message", async (req, res) => {
	console.log(req.body);
	const messageList = [];

	const messages = req.body.messages;
	const data = messageList.concat(messages);
	console.log("data", data);
	client
		.chat({
			model: "mistral-tiny",
			messages: [...data],
		})
		.then((response) => {
			res.status(200).json({ message: response.choices[0].message.content });
		})
		.catch((error) => {
			console.log("------------------------error------------------------", error);
			res.status(400).json({ message: error });
		});
	// res.status(200).json({ message: 'hello' });
});

// Load SSL certificate and private key

if (process.env.NODE_ENV != "development") {
	const sslOptions = {
		key: fs.readFileSync("/etc/letsencrypt/live/chatbot.lopvet-damien.com/privkey.pem"),
		cert: fs.readFileSync("/etc/letsencrypt/live/chatbot.lopvet-damien.com/fullchain.pem"),
	};
	const server = https.createServer(sslOptions, app);
	server.listen(httpsPort, () => {
		console.log(`HTTPS Server running on port ${httpsPort}`);
	});
}

// Listen on HTTP 
app.listen(port, () => {
 console.log(`HTTP Server running on port ${port}`);
});

