//this is a must when we are using dotenv in the server (react client does not need this)
//here we are loading the .env file
require('dotenv').config();

// Server-------------------------------------------------------
const express = require('express');
//for cross origin resource sharing (if url redirects from other url like front end app)
const cors = require('cors');
//define server using express
const app = express();
app.use(cors());
//used if we want to use some fun stuffs with socket.io
const server = require('http').createServer(app);

// Config--------------------------------------------------------
//setting a global constant for port
const port = process.env.SERVER_PORT;
//change static path based on NODE_ENV variable
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//------server listening to port---------
server.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
