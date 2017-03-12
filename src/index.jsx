import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecognitionV from './component/RecognitionV';
import VoicePlayer from './lib/VoicePlayer';
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
      showText: true
    };
  }

  voiceResult(result) {
  	console.log("Result: " + result);
  	this.setState({ voiceText:result }, () => {
  		this.setState({ playVoice: true });
  	});
  }

  onEnd() {
  	this.setState({ playVoice: false });
  }

  handleSubmit(){
    var val = this.state.text
    axios.get('http://localhost:3000/restaurant/listings', {
      headers: {
        'Access-Control-Allow-Origin': true
      }
    })
    .then(data => console.log('asdfasdfasd', data))
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
          <form onSubmit={(e) => {
            e.preventDefault()
            console.log(this.state.text)
            this.handleSubmit()
          }}>
            <input
              className="search"
              type="text"
              placeholder="Search for dining"
              value={this.state.text}
              onChange={(e) => this.setState({text: e.target.value})}
            />
            <input
              type='submit'
              value='submit'
            />
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

      </main>
		</div>
	  )
	}
}

ReactDOM.render(
  <Index />,
  document.getElementById('app')
);
