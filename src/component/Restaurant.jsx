import React from 'react';

const Restaurant = (props) => {
	var { key, restaurant, handleClick } = props

	var inst = $('[data-remodal-id=modal]').remodal();

	return (
		<li key={key} className="restaurant-list-item">
			<h4>{restaurant.name}</h4>
			<p>{restaurant.address}, {restaurant.city}, {restaurant.state}, {restaurant.postal_code}</p>
			<a 
				onClick={() => handleClick(restaurant.rid, restaurant.name)}
				data-remodal-target="modal" href=""
				className="restaurant-url" 
			>
				Find Reservation
			</a>
			<a className="restaurant-tel" href={`tel:${restaurant.phone_number}`}>{restaurant.phone_number}</a>
		</li>
	)
};

export default Restaurant