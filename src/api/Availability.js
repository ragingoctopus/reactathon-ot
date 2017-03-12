import axios from 'axios';

const getAvailability = (id, options) => {
  const url = 'http://localhost:3000/restaurant/availability';
  console.log('getting availability for ', id);

  axios.get(url + "/" + id, { params: options })
  .then((res) => {
    console.log('availability', res);
    return res;
  })

}

export default getAvailability;
