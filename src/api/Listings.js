import axios from 'axios';

const getListings = (name, location) => {
  const url = 'http://localhost:3000/restaurant/list';
  console.log('getting listings');

  axios.get(url)
  .then((res) => {
    console.log('result', res);
    return res;
  })

}

export default getListings;
