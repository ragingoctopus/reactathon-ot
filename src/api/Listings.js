import axios from 'axios';

const getAllListing = () => {
	      console.log('getting all')

	const url = 'http://localhost:3000/restaurant/listings'
	return axios.get(url)
}

const getListings = (name) => {
	      console.log("ResName: " + name);

  const url = 'http://localhost:3000/restaurant/listings?name=' + name;
  //console.log('getting listings');

  return axios.get(url)

}

export default {
	getListings,
	getAllListing
}
