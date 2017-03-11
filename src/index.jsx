import React, { Component } from 'react';
import ReactDOM from 'react-dom';
<<<<<<< d64f0674ed1a2f7804022f4b702c9d8d0c3f5ebb
import RecognitionV from './component/RecognitionV';
import './css/index.css';

class Index extends Component {
	constructor (props) {
    super(props)
    this.state = {
    	showText: true
    };
  }

=======
import { VoicePlayer } from 'react-voice-components'
import axios from 'axios';
import './css/index.css';

class Index extends Component {
  constructor(){
    super()
    this.state = {
      text: ''
    }
  }
  handleSubmit(){
    var val = this.state.text
    axios.get('http://localhost:3000/resturant', {
      headers: {
        'Access-Control-Allow-Origin': true
      }
    })
    .then(data => console.log('asdfasdfasd', data))
    .catch( err => { throw new Error(err)})
  }
>>>>>>> changes
	render() {
	  return (
		<div>
			<main className="main-app-container">
        <header className="content-container header">
          <section>
            <img src="http://res.cloudinary.com/meetshermanchen-com/image/upload/v1489262593/Logo_horizontal_RGB_rrnfhk.png" alt="OpenTable" className="brand"/>
          </section>
        </header>
        <section className="searchbar">
<<<<<<< d64f0674ed1a2f7804022f4b702c9d8d0c3f5ebb
          <form>
            <input className="search" type="text" placeholder="Search for dining"/>
=======
          <form onSubmit={(e) => {
            e.preventDefault()
            console.log(this.state.text)
            this.handleSubmit()
          }}>
            <input 
              className="search" 
              type="text" 
              placeholer="Search for dining"
              vaue={this.state.text}
              onChange={(e) => this.setState({text: e.target.value})}
            />
            <input 
              type='submit' 
              value='submit' 
            />
>>>>>>> changes
          </form>
        </section>
        <section className="content-contai
        ner speech-button">
            <p><i className="fa fa-microphone fa-5x icon"></i></p>
        </section>
  			<RecognitionV />
      </main>
		</div>
	  )
	}
}

ReactDOM.render(
  <Index />,
  document.getElementById('app')
);