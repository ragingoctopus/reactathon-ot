import React, { Component } from 'react';

export default class RestaurantList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { restaurants } = this.props;
		const mappedRestaurants = restaurants.map((restaurant, key) => {
			return (
				<li key={key} className="restaurant-list">
					<h4>{restaurant.name}</h4>
					<p>{restaurant.address}, {restaurant.city}, {restaurant.state}, {restaurant.postal_code}</p>
					<a className="restaurant-url" href={restaurant.reservation_url} target="_blank">Make Reservation</a>
					<a className="restaurant-tel" href={`tel:${restaurant.phone_number}`}>{restaurant.phone_number}</a>
				</li>
			)
		});

		return (
			<section>
				<ul>
					{mappedRestaurants}
				</ul>
			</section>
		)
	}
};