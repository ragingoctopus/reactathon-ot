const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const restaurant = require('./routes/restaurant');
const reservation = require('./routes/reservation');

app.use(express.static('dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use(cors());
app.use('/restaurant', restaurant);
app.use('/reservation', reservation);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
