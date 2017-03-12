var express = require('express');
var router = express.Router();

var rp = require('request-promise');

var headers = {
  Authorization: 'bearer 27037c67-f394-4cfd-ab51-069ac71132fb'
};

router.post('/lock', (req, res) => {
  console.log('POST /lock');
  const options = {
    uri: 'https://platform.otqa.com/booking/slot_locks',
    method: 'POST',
    headers: headers,
    json: true,
    body: req.body
  };

  rp(options)
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(err => {
      console.log(err.message)
      return res.status(400).send(err.message);
    })
});

router.post('/reserve', (req, res) => {
  console.log('POST /reserve');
  console.log(req.body);

  const options = {
    uri: 'https://platform.otqa.com/booking/reservations',
    method: 'POST',
    headers: headers,
    json: true,
    body: req.body
  };

  rp(options)
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(err => {
      console.log(err.message)
      return res.status(400).send(err.message);
    })
});

module.exports = router;
