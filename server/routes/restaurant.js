var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var rp = require('request-promise');

var headers = {
  Authorization: 'bearer 27037c67-f394-4cfd-ab51-069ac71132fb'
};

router.get('/availability/:id', (req, res) => {
  console.log('GET /availability', req.params)
  const spec = req.query;
  const rid = req.params.id;
  const availUrl = 'https://platform.otqa.com/availability';

  console.log(spec);

  const options = {
    uri: `${availUrl}/${rid}`,
    method: 'GET',
    headers: headers,
    qs: {
      start_date_time: spec.start_date_time,
      forward_minutes: spec.forward_minutes,
      backward_minutes: spec.backward_minutes,
      party_size: spec.party_size
    }
  };

  rp(options)
    .then(response => {
      // console.log('avail response', response)
      return res.status(200).send(response);
    })
    .catch(err => {
      // console.log(err)
      return res.status(400).send(err.message);
    })
});

router.get('/listings', (req, res) => {
  console.log('GET /listings');
  const options = {
    uri: 'https://platform.otqa.com/sync/listings',
    method: 'GET',
    headers: headers,
    json: true
  };

  rp(options)
    .then(response => {
      // console.log(response)
      return res.status(200).send(response);
    })
    .catch(err => {
      // console.log(err)
      return res.status(400).send(err.message);
    })
});

module.exports = router;
