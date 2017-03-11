const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const restaurant = require('./routes/restaurant');

app.use(express.static('dist'))

app.use('/restaurant', restaurant);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});