import axios from 'axios';

const getReservation = (options) => {
  const lockUrl = 'http://localhost:3000/reservation/lock';
  console.log('getting lock for ', options);

  const lockOptions = {
    restaurant_id: options.restaurant_id,
    party_size: options.party_size,
    date_time: options.date_time
  };

  axios.post(lockUrl, lockOptions)
    .then((res) => {
      console.log('lock', res);
      return res;
    }).then((lock) => {
      console.log('got timeslot lock', lock);

      const reserveUrl = 'http://localhost:3000/reservation/reserve';
      const resOptions = {
        restaurant_id: options.restaurant_id,
        reservation_token: lock.data.reservation_token,
        first_name: options.first_name,
        last_name: options.last_name,
        email_address: options.email,
        phone: {
          number: options.phone_number
        }
      };

      axios.post(reserveUrl, resOptions)
        .then((res) => {
          console.log('reservation details', res);
          return res;
        });
    })

}

export default getReservation;
