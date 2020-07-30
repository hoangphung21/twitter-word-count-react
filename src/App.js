import React from "react";

import "./App.css";

// 1st component
class App extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      numChar:0,
      disabled: true,
      drawRing:{
        stroke:"",
        strokeDasharray: ""
      }
    }

    this.countChar = this.countChar.bind(this);

    
  }

  // words counter function
  countChar(event){
    const numChar = event.target.value === "" ? 0 : event.target.value.split(" ").length;
    const tweetedText = event.target.value;
    
    
    this.setState(()=>({
      numChar: numChar,
      tweetedText: tweetedText,
      
    }));

    this.drawRing();

    this.handleChange();

  }

  handleChange(){
    if(this.state.numChar <= 50 ){
      this.setState({
        disabled:false
      }
      );
    }else{
      this.setState({
        disabled:true
      });
    }
  }

  drawRing(){
    const r= 15;
    const circleLength = 2*Math.PI*r;
    const twitterBlue = "rgb(29, 161, 242)";

    let colored = (circleLength * this.state.numChar)/50;
    let gray = circleLength - colored > 0 ? circleLength - colored : 0;

    this.setState((state) =>({
      drawRing:{
        
          stroke: (50 - this.state.numChar) <= 0 ? "red" : 
                  (50 - this.state.numChar) <=10 ? "orange": 
                  twitterBlue,
          strokeDasharray: `${colored} ${gray}`
        
      }
    }));
  }

  render() {
    console.log(this.state.numChar);
    console.log(this.state.tweetedText);
    return (
      <div id="app">
        <h4>Twitter Counting Words!</h4>
        <Tweet countChar={this.countChar} numChar={this.state.numChar} drawRing={this.state.drawRing} tweetedText={this.state.tweetedText} disabled={this.state.disabled}></Tweet> {/*Pass all the states from Tweet components*/}
    
      </div>
    );
  }
}

//2nd component
class Tweet extends React.Component{
  render(){
    return(
      <div id="tweet">
        <TweetText countChar={this.props.countChar} /> 
        <Counter numChar={this.props.numChar} drawRing ={this.props.drawRing}/>
        <TweetedText tweetedText={this.props.tweetedText}/>
        <SubmitButton disabled={this.props.disabled}/>
      </div>
    );
  }
}

//3rd component
class TweetText extends React.Component{
  render(){
    return(
      <div id="tweetText">
        <textarea placeholder="What are you thinking?" onChange={this.props.countChar}></textarea> {/*Passed from Tweet component as a prop */}
    
      </div>

    
    );
  }
}

//4th component
class Counter extends React.Component{
  render(){
    return(
      <div id="counter">
        <p>You have inserted {this.props.numChar} words!</p> {/*Passed from Tweet component as a prop in order to show the number of words */}
        <svg>
          <circle id="gray" cx="50%" cy="50%" r="15"></circle>
          <circle id="colored" cx="50%" cy="50%" r="15" style={this.props.drawRing}></circle> {/*Passed from Tweet component as a prop in order to draw the svg circle */}
        </svg>       
      </div>
    );
  }
}

//5th component
class TweetedText extends React.Component{
  render(){
    return(
      <div id="tweetedtext">
        <p>{this.props.tweetedText}</p> {/*Passed from Tweet component as a prop */}
      </div>
    );
  }
}

//6th component
class SubmitButton extends React.Component{
  render(){
    return(
      <div id="submitButton">
        <button disabled={this.props.disabled}>Tweet</button> {/*Passed from Tweet component as a prop */}
      </div>
    );
  }
}

export default App;
