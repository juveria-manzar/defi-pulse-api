const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const protocols = require("../routes/protocol");

// Start Express
const app = express();

// Server Init
const HTTP_SERVER = 8080;
app.listen(HTTP_SERVER, () => {
  console.log(`server listening on port ${HTTP_SERVER}!`);
});

// Session
app.use(session({
  secret: 'some secret goes here',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

// CORS
app.use(cors({
  credentials: true,
  // put your origin url here
  //origin: ['http://localhost:3000']
}));

// Body Parser Init
app.use(bodyParser.json());


//test script on home page
app.get('/', (req,res)=>{
  res.send('I am working!')
})

// const users = require('../endpoints/protocols.js');

// Requiring Endpoints
app.use('/', protocols);

// //front end routes
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });


module.exports = app;
