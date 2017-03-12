import axios from 'axios';

const sendNotification = (phoneNumber, name, time) => {
  const url = 'http://localhost:3000/restaurant/notification';
  axios.post(url, {
    phonenumber: phoneNumber,
    restaurant: name,
    datetime: time,
  })
}

export default sendNotification;
