import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecognitionV from './component/RecognitionV';
import VoicePlayer from './lib/js/VoicePlayer';
import RestaurantList from './component/RestaurantList';
import axios from 'axios';
import './css/index.css';
import Listings from './api/Listings';
import Availability from './api/Availability';
import Reservation from './api/Reservation';

class Index extends Component {
  constructor(){
    super()
    this.state = {
    	showText: true,
    	playVoice: false,
    	voiceText: '',
    	text: '',
      showText: true,
      fetchedRestaurants: true,
      restaurantTime: {
        cool: "test"
      },
      restaurants: []
    };
  }
	handleClick(restaurantId){
		var d = new Date();
		var n = d.toISOString();
		n = n.substring(0, 16);
		var options = {
			start_date_time: '2017-03-29T19:00',
      forward_minutes: 120,
			backward_minutes: 30,
      party_size: 2
		}
		console.log(restaurantId,'restaurantIdrestaurantIdrestaurantId')
    this.setState({
      restaurantTime: {
        name: restaurantId
      }
    })
		Availability(334879, options)
	}
  voiceResult(result) {
  	let context = this;
  	console.log("Result: " + result);

  	let resultArray = result.toLowerCase().split(' ');
  	//This will be the logic commands
  	let keyword = resultArray[0];
  	switch (keyword) {
  		case "search": 
  			this.setState({
  				restaurants: [{
  					name: resultArray[1]
  				}]
  			},
  			context.handleSubmit()
  			)
  			
  			break;
  		default:
  			break;
  	}

  	this.setState({ voiceText:result }, () => {
  		this.setState({ playVoice: true });
  	});
  }

  onEnd() {
  	this.setState({ playVoice: false });
  }

  handleSubmit(){
			Listings()
			.then(data => this.setState({restaurants: data.data.items}, console.log(this.state.restaurants)))
  }

	render() {

		console.log('availability of restaurant', Availability(334879, {
			start_date_time : '2017-03-29T19:00',
			party_size: 2,
			forward_minutes: 120,
			backward_minutes: 30
		}));
		console.log('make reservation', Reservation({
			"first_name": "Steve",
			"last_name": "Zhou",
			"phone_number": 1112223333,
			"email": "stevezhou@example.com",
		  "party_size": 2,
		  "date_time": "2017-03-30T18:15",
		  "restaurant_id": 334879
		}));

	  return (
		<div>
			<main className="main-app-container">
        <header className="content-container header">
            <img src="http://res.cloudinary.com/meetshermanchen-com/image/upload/v1489262593/Logo_horizontal_RGB_rrnfhk.png" alt="OpenTable" className="brand"/>
        </header>
        <section className="searchbar">
          <form className="input-field" onSubmit={(e) => {
            e.preventDefault()
            console.log(this.state.text)
            this.handleSubmit()
          }}>
            <input
              type="text" 
              placeholder="Location or Restaurant"
              value={this.state.text}
              onChange={(e) => this.setState({text: e.target.value})}
            />
            <button className="submit-btn waves-effect waves-light waves-red btn">Find</button>
          </form>
        </section>
        <section className="content-container speech-button">
        	<RecognitionV voiceResult={this.voiceResult.bind(this)}/>
        	{this.state.playVoice && (
        		<VoicePlayer
        	  play
    				text={this.state.voiceText}
    				onEnd={this.onEnd.bind(this)}
    				/>
    			)}
        </section>
        {this.state.fetchedRestaurants && (
					<RestaurantList restuarantTime={this.state.restaurantTime} handleClick={this.handleClick.bind(this)} restaurants={this.state.restaurants} />
    		)}

      </main>
		</div>
	  )
	}
}

ReactDOM.render(
  <Index />,
  document.getElementById('app')
);
