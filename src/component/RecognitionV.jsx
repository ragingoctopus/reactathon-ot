import React, { Component } from 'react'
import VoiceRecognition from '../lib/VoiceRecognition'

export default class RecognitionV extends Component {
	constructor (props) {
    super(props)
    this.state = {
    	start: false,
    	stop: false
    }
  }

  onEnd() {
    this.setState({ start: false, stop: false })
    //this.props.action('end')()
  }

  onResult({ finalTranscript }) {
    //const result = finalTranscript

    this.setState({ start: false })
    console.log(finalTranscript);
    //this.props.action('result')(finalTranscript)
  }

  onStart() {
  	console.log("Voice Start")
  }

  render () {
    return (
      <div>
        <button onClick={() => this.setState({ start: true })}>start</button>
        <button onClick={() => this.setState({ stop: true })}>stop</button>

        {this.state.start && (
          <VoiceRecognition
            onStart={this.onStart}
            onEnd={this.onEnd.bind(this)}
            onResult={this.onResult.bind(this)}
            continuous={true}
            lang="en-US"
            stop={this.state.stop}
          />
        )}
      </div>
    )
  }
}