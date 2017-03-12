import axios from 'axios';

const getAllListing = () => {
	const url = 'http://localhost:3000/restaurant/listings'
	return axios.get(url)
}

const getListings = (name) => {
  const url = 'http://localhost:3000/restaurant/listings?name=' + name;
  //console.log('getting listings');

  return axios.get(url)

}

export default {
	getListings,
	getAllListing
}
