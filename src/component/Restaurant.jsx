import React from 'react';

const Restaurant = (props) => {
	var { key, restaurant, handleClick } = props
	var inst = $('[data-remodal-id=modal]').remodal();
	var stars = []
	var otherStars = Math.round(Math.random() * 3)
	for(var i = 0; i < otherStars + 2; i++){
		if(i === otherStars +1){
			var random = Math.round(Math.random())
			if(random > .5){
				stars.push(<i className="fa fa-star-half fa-2x" aria-hidden="true"></i>)
			}else {
				stars.push(<i className="fa fa-star fa-2x" aria-hidden="true"></i>)
			}
		}else {
			stars.push(<i className="fa fa-star fa-2x" aria-hidden="true"></i>)			
		}

	}
	return (
		<li key={key} className="restaurant-list-item">
			<h4>{restaurant.name}</h4>
			<div style={{display: 'flex'}}>
				<div style={{display: 'flex'}}>{stars}</div>
				<p>{restaurant.address}, {restaurant.city}, {restaurant.state}, {restaurant.postal_code}</p>
			</div>
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