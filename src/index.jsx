import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecognitionV from './component/RecognitionV';
import VoicePlayer from './lib/VoicePlayer';
import './css/index.css';

class Index extends Component {
	constructor (props) {
    super(props)
    this.state = {
    	showText: true,
    	playVoice: false,
    	voiceText: '',
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

	render() {
	  return (
		<div>
			<main className="main-app-container">
        <header className="content-container header">
            <img src="http://res.cloudinary.com/meetshermanchen-com/image/upload/v1489262593/Logo_horizontal_RGB_rrnfhk.png" alt="OpenTable" className="brand"/>
        </header>
        <section className="searchbar">
          <form>
            <input className="search" type="text" placeholder="Search for dining"/>
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