import axios from 'axios';

const getPromotions = (rid) => {
  const url = 'http://localhost:3000/promo';
  console.log('getting promotions for ', rid);

  return axios.get(url, { params: {
    rid: rid
  }});

};


// 
const findPromotions = (low, high) => {
  const url = 'http://localhost:3000/promo';
  console.log('getting promotions for ', rid);

  const arr = [];
  low = low || 0;
  high = high || 20;

  for(var rid = low; rid < high; rid++) {
    arr.push(function() {
      return axios.get(url, { params: { rid: rid}});
    }());
  }

  axios.all(arr)
    .then((resultArr) => {
      console.log('completed axios.all', resultArr);
      console.log(resultArr.map(e => e.data))
    });

};


module.exports = { getPromotions: getPromotions,
findPromotions: findPromotions };
