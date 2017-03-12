import React, { Component } from 'react';
import Reservation from '../api/Reservation';
import Notification from '../api/Notification';

export default class Modal extends Component {
	constructor (props) {
    super(props)
    this.state = {
    	bookShow: false,
    	message: '',
    	dateSelectShow: true,
    	date: ''
    }
  }

  componentWillMount() {
  	let context = this;
  	console.log("Test1");
  	$(document).on('cancellation', '.remodal', function (e) {
  		console.log("Test2");
		  context.cancelBtn();
		});
  }

  bookBtn() {
  	this.setState({ bookShow:true })
  }

  reserveBtn() {
  	let context = this;
  	let name = $('.reserve-name').val()
  	let nameArray = name.split(' ');
  	let firstName = nameArray[0];
  	let lastName = nameArray[1];
  	let phoneNumber = $('.reserve-number').val();

  	console.log("Reserving now");

  	let time = `${this.state.date}T18:15`;

  	Reservation({
  		"first_name": firstName,
  		"last_name": lastName,
  		"phone_number": phoneNumber,
  		"email": "stevezhou@example.com",
  	  "party_size": 2,
  	  "date_time": time,
  	  "restaurant_id": 334879
  	}, (res, err) => {
  		if (err) {
  			context.setState({ message:'timeslot not available' })
  		} else {
  			console.log("Success")
  			this.sendTextMessage(time)
  		}
  	});
  }

  cancelBtn() {
  	this.setState({ bookShow:false })
  }

  dateSelected() {
  	let date = $('.reserve-date').val();
  	this.setState({
  		dateSelectShow: false,
  		date: date
  	})
  }

  sendTextMessage(time) {
  	let context = this;
  	let name = $('.reserve-name').val()
  	let nameArray = name.split(' ');
  	let firstName = nameArray[0];
  	let lastName = nameArray[1];
  	let phoneNumber = $('.reserve-number').val();

  	Notification(`+1${phoneNumber}`, this.props.restaurantTime.name, time, () => {
  		console.log("success");
  	})
  }

  render() {
  	console.log(this.props)
  	const restaurantTimeArr = this.props.restaurantTime.data.map((data, key) => {
			return (
				<li>
					<div className="modal-item-container">
						<div className="modal-restaurant-time">{data.time}</div>
						<div className="modal-restaurant-url"><button onClick={this.bookBtn.bind(this)} className="waves-effect waves-light waves-red btn" target="_blank">Book</button></div>
					</div>
				</li>
			)
		});
		const bookInfo = () => {
			return (
				<div>
				<label>Name</label>
				<input className="reserve-name" type="text" />
				<label>Phone Number</label>
				<input className="reserve-number" type="text" />
				<div>{this.state.message}</div>
				<button onClick={this.reserveBtn.bind(this)} className="waves-effect waves-light waves-red btn">Book Now</button>
				</div>
			)
		}

		const chooseDate = () => {
			return (
				<div>
					<h4>Choose a Date</h4>
					<label>Date (yyyy-mm-dd)</label>
					<input className="reserve-date" type="text"/>
					<button onClick={this.dateSelected.bind(this)} className="waves-effect waves-light waves-red btn">Next</button>
				</div>
			)
		}

  	return (
  		<div className="remodal" data-remodal-id="modal" data-remodal-options="hashTracking: false">
  		  <button data-remodal-action="close" className="remodal-close"></button>
  		  <h3>Availability</h3>
  		  	<h5>{this.props.restaurantTime.name}</h5>
  		  	{ this.state.dateSelectShow ? chooseDate() :
			  	<ul>
			    {this.state.bookShow ? bookInfo() : restaurantTimeArr}
			    </ul>
			  	}
  		  <button onClick={this.cancelBtn.bind(this)} data-remodal-action="cancel" className="remodal-cancel">Cancel</button>
  		</div>
  	)
  }
}