import axios from 'axios';

const getListings = (name, location) => {
  const url = 'http://localhost:3000/restaurant/listings';
  console.log('getting listings');

  return axios.get(url)

}

export default getListings;
