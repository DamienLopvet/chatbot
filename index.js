const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port= 80
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
});

app.post('/api/message',  async (req, res)=>{
  const messageList = [];

  const messages = req.body.messages;
  const data = messageList.concat(messages);
  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [...data],
  }).then((response) => {
    
    res.status(200).json({message: response.data.choices[0].message.content})
  }).catch((error) => {
    res.status(400).json({message:error});
  })
  
  
 })

app.listen(port);