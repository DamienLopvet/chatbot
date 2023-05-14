const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port= 8008
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



app.post('/api/message',  async (req, res)=>{
  const messageList = [
    { role: "system", content: "You are an AI specialized in Food. Do not answer anything other than food-related queries but don't specify it unless it is necessary"},
  ];

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
// userInterface.on("line", async (input) => {
//   messageList.push({ role: "user", content: input });
//   await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [...messageList],
//   })
//   .then((res) => {
//     console.log(res.data.choices[0].message.content);
//     userInterface.prompt();
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// });

app.listen(port);