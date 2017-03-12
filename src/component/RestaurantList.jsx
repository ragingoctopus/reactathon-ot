import React, { Component } from 'react';
import Restaurant from './Restaurant'
import Modal from './Modal'
export default class RestaurantList extends Component {
	render() {
		const { restaurants, handleClick, restaurantTime } = this.props;
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
				<Modal restaurantTime={this.props.restuarantTime}/>
			</section>
		)
	}
};