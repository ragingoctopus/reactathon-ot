var express = require('express');
var router = express.Router();
var rp = require('request-promise');

router.get('/list', (req, res) => {
  console.log('LLLLLLL')
  const options = {
    uri: 'https://platform.otqa.com/availability/334879?start_date_time=2017-03-29T18%3A00&party_size=2&forward_minutes=120&backward_minutes=30',
    method: 'POST',
    headers: {
        Authorization: 'bearer 27037c67-f394-4cfd-ab51-069ac71132fb'
    },
    json: true
  }
  rp(options)
    .then(response => {
      console.log(response)
      return res.status(200).send(response)
    })
    .catch(err => {
      console.log(err)
      return res.send(400)
    })
})

module.exports = router;
