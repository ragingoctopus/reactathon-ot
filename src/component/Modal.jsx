import React, { Component } from 'react';

export default class Modal extends Component {
	constructor (props) {
    super(props)

  }

  render() {
  	console.log(this.props)
  	return (
  		<div className="remodal" data-remodal-id="modal">
  		  <button data-remodal-action="close" className="remodal-close"></button>
  		  <h1>Remodal</h1>
  		  <p>
  		    {this.props.restaurantTime.name}
  		  </p>
  		  <button data-remodal-action="cancel" className="remodal-cancel">Cancel</button>
  		  <button data-remodal-action="confirm" className="remodal-confirm">OK</button>
  		</div>
  	)
  }
}