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
import Notification from './api/Notification';
import Promotions from './api/Promotions';

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
        name: '',
        id: '',
        data: []
      },
      restaurants: [],
      listening: false,
      inst: '',
    };
  }

  componentDidMount() {
    let context = this;
    $( document ).ready(function() {
      context.setState({
        inst:$('[data-remodal-id=modal]').remodal()
      })
    });
  }

  onListen(){
    this.setState({ listening: !this.state.listening})
  }

	handleClick(restaurantId, name){
    var context = this;
		var d = new Date();
		var n = d.toISOString();
		n = n.substring(0, 16);
		var options = {
			start_date_time: '2017-03-29T20:00',
      forward_minutes: 8000,
			backward_minutes: 8000,
      party_size: 2
		}
		console.log(restaurantId,'restaurantIdrestaurantIdrestaurantId')
    Availability(334879, options).then((res) => {
      console.log('availability', res);
      context.setState({
        restaurantTime: {
          name: name,
          id: restaurantId,
          data: res.data
        }
      })
    })
	}

  voiceResult(result) {
  	console.log("Result: " + result);
  	let resultArray = result.toLowerCase().split(' ');
  	//This will be the logic commands
  	let keyword = resultArray[0];
    console.log(keyword);
  	switch (keyword) {
  		case "search":
        resultArray.shift()
  			context.handleSubmit(resultArray.join(' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}))
        this.setState({ voiceText:result }, () => {
          this.setState({ playVoice: true });
        });
  			break;
      case "reserve":
        console.log("Reserve");

        resultArray.shift()
        context.openReserveVoice(resultArray.join(' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}))
        break;
      case "play":
        if (result.toLowerCase() === "play restaurant names") {
          context.playBackNames();
        }
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

	handleSubmit(name){
    let context = this;
    let resName = name || this.state.text;
    if (resName === '' || resName === 'All') {
			Listings.getAllListing()
			.then(data => {
        var newData = data.data.map(item => {
          item.rating = Math.round(Math.random() * 3);
          item.half = Math.random() > .5 ? true : false;
          return item
        })
        this.setState({
          restaurants: newData
        })
      })
    } else {
      Listings.getListings(resName)
      .then(data => {
        var newData = data.data.map(item => {
          item.rating = Math.round(Math.random() * 3);
          item.half = Math.random() > .5 ? true : false;
          return item
        })
        this.setState({
          restaurants: newData
        })
      })
    }
  }

  playBackNames() {
    let context = this;
    let restaurantNames = '';
    this.state.restaurants.map((restaurant, key) => {
      restaurantNames += '' + restaurant.name;
    })

    context.setState({ voiceText:restaurantNames }, () => {
      context.setState({ playVoice: true });
    });
  }

  playBackTimes(name) {
    let context = this;
    var options = {
      start_date_time: '2017-03-29T20:00',
      forward_minutes: 8000,
      backward_minutes: 8000,
      party_size: 2
    }
    Availability(334879, options).then((res) => {
      context.setState({
        restaurantTime: {
          name: name,
          id: 334879,
          data: res.data
        }
      }, () => {
        let restaurantTimes = 'Here are the the times for ' + name;
        context.state.restaurantTime.data.map((data, key) => {
          restaurantTimes += '' + data.speach_time;
        })

        context.setState({ voiceText:restaurantTimes }, () => {
          context.setState({ playVoice: true });
        });
      })
    })

  }

  openReserveVoice(name) {
    let context = this;
        var options = {
      start_date_time: '2017-03-29T20:00',
      forward_minutes: 8000,
      backward_minutes: 8000,
      party_size: 2
    }
    Availability(334879, options).then((res) => {
      context.setState({
        restaurantTime: {
          name: name,
          id: 334879,
          data: res.data
        }
      }, () => {
        context.state.inst.open();
      })
    })
  }

	render() {

		console.log('listings', Listings);
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

		console.log('promotions', Promotions.findPromotions());



	  return (
		<div>
			<main className="main-app-container">
        <header className="content-container header">
            <img src="http://res.cloudinary.com/meetshermanchen-com/image/upload/v1489262593/Logo_horizontal_RGB_rrnfhk.png" alt="OpenTable" className="brand"/>
        </header>
        <section className="searchbar">
          <form onSubmit={(e) => {
            e.preventDefault()
            //console.log(this.state.text)
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
        <section style={{textAlign:'center'}}>
          <section>
            <RecognitionV onListen={this.onListen.bind(this)} voiceResult={this.voiceResult.bind(this)}/>
            {this.state.playVoice && (
              <VoicePlayer
              play
              text={this.state.voiceText}
              onEnd={this.onEnd.bind(this)}
              />
            )}
            <div className="speech-container">
              <a onClick={this.playBackNames.bind(this)} className="waves-effect waves-light speech-button"><i className="fa fa-play fa-5x icon"></i></a>
            </div>
          </section>
          <img src='../lib/ellipsis.svg' className={this.state.listening === true? '' : 'hide'}/>
        </section>
        {this.state.fetchedRestaurants && (
					<RestaurantList restuarantTime={this.state.restaurantTime} handleClick={this.handleClick.bind(this)} restaurants={this.state.restaurants} modalInst={this.state.inst}/>
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
