import MistralClient from "@mistralai/mistralai";
import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
const app = express();
const port = 80;
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

const apiKey = process.env.MISTRAL_API_KEY || "your_api_key";

const client = new MistralClient(apiKey);


app.get("/", async (req, res) => {
  console.log('api key',process.env.MISTRAL_API_KEY);
  const chatResponse = await client
		.chat({
			model: "mistral-tiny",
			temperature: 0.1,
			messages: [{ role: "user", content: "is the chat up and running ?" }],
		})
		.then((response) => {
			res.status(200).json({ message: response.choices[0].message.content });
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json(error.name);
		});
  
});


app.post("/api/message", async (req, res) => {
	console.log(req.body);
	const messageList = [];

	const messages = req.body.messages;
  const data = messageList.concat(messages);
  console.log('data',data);
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

app.listen(port);
