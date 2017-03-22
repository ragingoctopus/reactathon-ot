var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var rp = require('request-promise');

var headers = {
  Authorization: 'bearer 27037c67-f394-4cfd-ab51-069ac71132fb'
};

router.get('/', (req, res) => {
  // console.log('GET /promo/', req.params)
  const params = req.query;
  // console.log(params);

  const offerUrl = 'https://platform.otqa.com/offers';

  const options = {
    uri: `${offerUrl}`,
    method: 'GET',
    headers: headers,
    qs: params
  };

  rp(options)
    .then(response => {
      // console.log('avail response', response)
      const json = JSON.parse(response);
      if(json.length > 0) {
        console.log(json.map(offer => {
          return {
            rid: offer.rid,
            offer_id : offer.offer_id
          }
        }));
      }
      return res.status(200).send(response);
    })
    .catch(err => {
      // console.log(err)
      return res.status(400).send(err.message);
    })
});


module.exports = router;
