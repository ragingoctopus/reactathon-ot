import React, { Component } from 'react';
import Restaurant from './Restaurant'

export default class RestaurantList extends Component {
	render() {
		const { restaurants, handleClick } = this.props;
		const mappedRestaurants = restaurants.map((restaurant, key) => {
			return (
				<Restaurant key={key} restaurant={restaurant} handleClick={handleClick} />
			)
		});

		return (
			<section>
				<ul className='restaurant-list'>
					{mappedRestaurants}
				</ul>
			</section>
		)
	}
};