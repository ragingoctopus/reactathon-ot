import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecognitionV from './component/RecognitionV';
import VoicePlayer from './lib/VoicePlayer';
import RestaurantList from './component/RestaurantList';
import axios from 'axios';
import './css/index.css';
import Listings from './api/Listings';
import Availability from './api/Availability';

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
      restaurants: [{
      	name: "Cooking With Sherman",
      	address: "2408 GitHub St.",
      	city: "San Francisco",
      	state: "CA",
      	postal_code: "94102",
      	phone_number: "1234567",
      	reservation_url: "https://www.google.com"
      },
      {
      	name: "Cooking With Sherman",
      	address: "2408 GitHub St.",
      	city: "San Francisco",
      	state: "CA",
      	postal_code: "94102",
      	phone_number: "1234567",
      	reservation_url: "https://www.google.com"
      },
      {
      	name: "Cooking With Sherman",
      	address: "2408 GitHub St.",
      	city: "San Francisco",
      	state: "CA",
      	postal_code: "94102",
      	phone_number: "1234567",
      	reservation_url: "https://www.google.com"
      },
      {
      	name: "Cooking With Sherman",
      	address: "2408 GitHub St.",
      	city: "San Francisco",
      	state: "CA",
      	postal_code: "94102",
      	phone_number: "1234567",
      	reservation_url: "https://www.google.com"
      }]
    };
  }

  voiceResult(result) {
  	let context = this;
  	console.log("Result: " + result);
  	//Logic key words to do actions
  	//Reserve
  	//Cancel
  	//Search

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
  	var context = this;
    var val = this.state.text
    axios.get('http://localhost:3000/restaurant/listings', {
      headers: {
        'Access-Control-Allow-Origin': true
      }
    })
    .then(data => {
    	context.setState({ fetchedRestaurants: true });
    	console.log('asdfasdfasd', data)
    })
    .catch( err => { throw new Error(err)})
  }

	render() {

		console.log('listings', Listings());
		console.log('availability of restaurant', Availability(334879, {
			start_date_time : '2017-03-29T19:00',
			party_size: 2,
			forward_minutes: 120,
			backward_minutes: 30
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
    			<RestaurantList restaurants={this.state.restaurants} />
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
