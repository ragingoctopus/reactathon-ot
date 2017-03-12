import axios from 'axios';

const getAvailability = (id, options) => {
  const url = 'http://localhost:3000/restaurant/availability';
  console.log('getting availability for ', id);

  return axios.get(url + "/" + id, { params: options })

}

export default getAvailability;
