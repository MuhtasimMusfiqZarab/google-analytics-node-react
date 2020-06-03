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

//----------------combine gAnalytics library & server ------------

//this path allows the client to request a list of metrics( or a metric)-- & returns all the data when relrives at once
app.get('/api', (req, res) => {
  const { metrics, startDate, endDate } = req.query;
  console.log(`Requested metrics: ${metrics}`);
  console.log(`Requested start-date: ${startDate}`);
  console.log(`Requested end-date: ${endDate}`);
  //Promise.all waits until all promises are resolved
  Promise.all(
    getData(metrics ? metrics.split(',') : metrics, startDate, endDate)
  )
    //here data is a list of data objects that we've created in gAnalytics.getData
    .then((data) => {
      // flatten list of objects into one object
      const body = {};
      //iterate through all objects &combine them into a body object
      Object.values(data).forEach((value) => {
        Object.keys(value).forEach((key) => {
          body[key] = value[key];
        });
      });
      //this body object is then sent to the client
      res.send({ data: body });
      console.log('Done');
    })
    .catch((err) => {
      console.log('Error:');
      console.log(err);
      res.send({ status: 'Error getting a metric', message: `${err}` });
      console.log('Done');
    });
});

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
