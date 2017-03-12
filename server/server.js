const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors')

app.use(cors())

const port = process.env.PORT || 3000;

const restaurant = require('./routes/restaurant');

app.use(express.static('dist'))

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use('/restaurant', restaurant);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
