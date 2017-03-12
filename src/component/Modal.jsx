import React, { Component } from 'react';

export default class Modal extends Component {
	constructor (props) {
    super(props)
    this.state = {
    	
    }
  }
  
  render() {
  	console.log(this.props)
  	const restaurantTimeArr = this.props.restaurantTime.data.map((data, key) => {
			return (
				<li>
					<div className="modal-item-container">
						<div className="modal-restaurant-time">{data.time}</div>
						<div className="modal-restaurant-url"><a className="waves-effect waves-light waves-red btn" target="_blank">Book</a></div>
					</div>
				</li>
			)
		});

  	return (
  		<div className="remodal" data-remodal-id="modal" data-remodal-options="hashTracking: false">
  		  <button data-remodal-action="close" className="remodal-close"></button>
  		  <h3>Availability</h3>
  		  	<h5>{this.props.restaurantTime.name}</h5>
			  	<ul>
			    {restaurantTimeArr}
			    </ul>
  		  <button data-remodal-action="cancel" className="remodal-cancel">Cancel</button>
  		</div>
  	)
  }
}