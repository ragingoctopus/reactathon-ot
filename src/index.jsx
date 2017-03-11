import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VoicePlayer } from 'react-voice-components'
import './css/index.css';

class Index extends Component {
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
          <form>
            <input className="search" type="text" placeholer="Search for dining"/>
          </form>
        </section>
        <section className="content-contai
        ner speech-button">
            <p><i className="fa fa-microphone fa-5x icon"></i></p>
        </section>
        <VoicePlayer
    		play
    		text="React voice player demonstration Cool"
  		/>,
      </main>
		</div>
	  )
	}
}

ReactDOM.render(
  <Index />,
  document.getElementById('app')
);