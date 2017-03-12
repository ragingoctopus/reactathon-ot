var express = require('express');
var router = express.Router();
var rp = require('request-promise');

const API = {
  SEARCH_ALL: '/searchall',
  SEARCH: '/search/:id'
}

const URLs = {
  SEARCH: 'https://platform.otqa.com/availability'
}

router.get(API.SEARCH, (req, res) => {
  const spec = req.query
  const rid = req.params.id

  const options = {
    uri: `${URLs.SEARCH}/${rid}`,
    method: 'GET',
    headers: {
      Authorization: 'bearer 27037c67-f394-4cfd-ab51-069ac71132fb'
    },
    qs: {
      start_date_time: spec.start_date_time,
      forward_minutes: spec.forward_minutes,
      backward_minutes: spec.backward_minutes,
      party_size: spec.party_size
    }
  }

  rp(options)
    .then(response => {
      if (response) {
        return res.status(200).send(response)
      } else {
        return res.status(200).send('No restaurant matched.')
      }
    })
    .catch(err => {
      return res.statusCode(500).send('Research restaurant fail.')
    })
})

module.exports = router;
