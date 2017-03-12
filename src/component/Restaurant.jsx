import React from 'react';

const Restaurant = (props) => {
	var { restaurant, handleClick } = props
	var inst = $('[data-remodal-id=modal]').remodal();
	const choiceWinner = restaurant.rating + 2 === 5 ? <img style={{height: '75px'}} src='http://newhaven.tarrylodge.com/wp-content/uploads/sites/18/2015/08/Diners-Choice-740x380.png'/> : '';
	var stars = []
	var otherStars = restaurant.rating
	for(var i = 0; i < otherStars + 2; i++){
		if(i === otherStars +1){
			if(restaurant.random){
				stars.push(<i key={i} className="fa fa-star-half fa-lg" aria-hidden="true"></i>)
			}else {
				stars.push(<i key={i} className="fa fa-star fa-lg" aria-hidden="true"></i>)
			}
		}else {
			stars.push(<i key={i} className="fa fa-star fa-lg" aria-hidden="true"></i>)			
		}

	}
	return (
		<li className="restaurant-list-item">
			<h4>{restaurant.name}</h4>
			<div style={{display: 'flex'}}>
				<div>
					<div style={{display: 'flex'}}>
						<div className='info' style={{display: 'flex'}}>{stars}</div>
						<div className='info'>{restaurant.address}, {restaurant.city}, {restaurant.state}, {restaurant.postal_code}</div>
					</div>
						<a 
							onClick={() => handleClick(restaurant.rid, restaurant.name)}
							data-remodal-target="modal" href=""
							className="restaurant-url" 
						>
							Find Reservation
						</a>
						<a className="restaurant-tel" href={`tel:${restaurant.phone_number}`}>{restaurant.phone_number}</a>
				</div>
				{choiceWinner}
			</div>
		</li>
	)
};

export default Restaurant