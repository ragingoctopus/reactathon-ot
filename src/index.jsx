import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecognitionV from './component/RecognitionV';
import { VoicePlayer } from 'react-voice-components'
import axios from 'axios';
import './css/index.css';

class Index extends Component {
  constructor(){
    super()
    this.state = {
      text: '',
      showText: true
    }
  }
  handleSubmit(){
    var val = this.state.text
    axios.get('http://localhost:3000/restaurant/list', {
      headers: {
        'Access-Control-Allow-Origin': true
      }
    })
    .then(data => console.log('asdfasdfasd', data))
    .catch( err => { throw new Error(err)})
  }
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