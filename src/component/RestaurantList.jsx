import React, { Component } from 'react';
import Restaurant from './Restaurant.jsx'
import Modal from './Modal'
export default class RestaurantList extends Component {
	render() {
		const { restaurants, handleClick, restaurantTime } = this.props;
		console.log('restaurants', restaurants)
		const mappedRestaurants = restaurants.map((restaurant, i) => {
			return (
				<Restaurant key={i} restaurant={restaurant} handleClick={handleClick} />
			)
		});

		return (
			<section className='restaurant-list'>
				<ul className='restaurant-list'>
					{mappedRestaurants}
				</ul>
				<Modal restaurantTime={this.props.restuarantTime}/>
			</section>
		)
	}
};