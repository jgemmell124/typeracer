import React, { Component, useState, useEffect, useRef } from 'react';
import '../Styles/TextToType.css';
import Timer from './Timer';

var isDone = 0;
var reset = 0;
var isStarted = 0;
export default class TextToType extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      typed: [], // text typed so far
      toType: [], // text remaining to type
      wordIndex: 0, // the index of the current word
      author: "",
      wordArray: [], // keep track of all words in the quote
      currentWord: "",
      textWord: "",
      index: 0,
      maxIndex: 0,
      style: "text-box",
      start: 0,
    };

    // bind functions to use 'this' keyword
    this.getQuote();
    this.getQuote = this.getQuote.bind(this);
    this.handleTextValue = this.handleTextValue.bind(this);
    this.resetValues = this.resetValues.bind(this);
  }

  getQuote = () => {
    fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      // each one has to be updated seprately??
      let idx = Math.floor(Math.random() * data.length);
      this.setState({
        ...this.state,
        quote: data[idx].text,
        author: data[idx].author,
        wordIndex: 0,
      });
      this.setState({
        ...this.state,
        wordArray: this.state.quote.split(" ")
      });
      this.setState({
        ...this.state,
        currentWord: this.state.wordArray[0]
      });
      var newToType = this.state.wordArray;
      newToType.shift();
      this.setState({
        ...this.state,
        maxIndex: this.state.wordArray.length,
        toType: newToType,
      });
      console.log(this.state.maxIndex);
      //console.log("length: " + this.state.wordArray.length);
      //this.props.setNumChars(this.state.quote.length);
    });
    
  };

  checkInput = (e) => {
    let input = e.target.value;
      for (var x = 0; x < input.length; x++) {
        var c = input.charAt(x);
        if (x > this.state.currentWord.length || c !== this.state.currentWord[x]) {
          this.setState({
            ...this.state,
            style: "text-box-wrong",
          });
          break;
        }
        else {
          this.setState({
            ...this.state,
            style: "text-box",
          });
        }
        console.log(c);
      }
  };

  shiftWords = (e) => {
    var newToType = this.state.toType;
    var newWord = newToType.shift();
    this.setState({
      ...this.state,
      index: ++this.state.index,
      typed: this.state.typed.push(this.state.currentWord),
      toType: newToType,
    });
    console.log("word index: " + this.state.index + " total index: " + this.state.maxIndex);
    this.setState({
      ...this.state,
      currentWord: newWord, //this.state.wordArray[this.state.index++],
      wordIndex: 0,
      
    });
    // reset input box text
    // tell timer how many characters were typed
    //console.log("character length " + this.props.NumChars);
    //const charNums = this.props.NumChars;
    this.props.setNumChars(e.target.value.length + this.props.numChars);

  };


  // highlight the current word to type
  handleTextValue(e) {
    isStarted = 1;
    this.props.setTimer(true);
    console.log("current word: " + this.state.currentWord);
    console.log("event: " + e.target.value);
    console.log(this.state.index);
    console.log(this.state.maxIndex);
    // if this is the last word to be typed:
    if (this.state.maxIndex === this.state.index) {
      if (this.state.currentWord  === e.target.value) {
        this.setState({
          ...this.state,
          index: this.state.index + 1,
          style: "text-box-done"
        });
        e.target.value = "Done!";
        isDone = 1;
        this.shiftWords(e);
        this.setState({
          style: "text-box-done",
        });
        //this.checkInput(e);
      }
      else {
        this.checkInput(e);
      }
    }
    // if the current word to be typed is the same as the word typed in the box
    else if (this.state.currentWord + " " === e.target.value) {
      var newToType = this.state.toType;
      var newWord = newToType.shift();
      this.setState({
        ...this.state,
        index: ++this.state.index,
        typed: this.state.typed.push(this.state.currentWord),
        toType: newToType,
      });
      console.log("word index: " + this.state.index + " total index: " + this.state.maxIndex);
      this.setState({
        ...this.state,
        currentWord: newWord, //this.state.wordArray[this.state.index++],
        wordIndex: 0,
        
      });
      // reset input box text
      // tell timer how many characters were typed
      //console.log("character length " + this.props.NumChars);
      //const charNums = this.props.NumChars;
      this.props.setNumChars(e.target.value.length + this.props.numChars);

      e.target.value = "";

    }
    // once sentence is finished being typed
    else if (this.state.maxIndex + 1 === this.state.index) {
      e.target.value = "Done!";
      isDone = 1;
      this.props.setTimer(false);
      this.setState({
        ...this.state,
        style: "text-box-done"
      })
    }
    else {
      this.checkInput(e);
    }
  };

  resetValues() {
    this.setState({
      quote: "",
      typed: [], // text typed so far
      toType: [], // text remaining to type
      wordIndex: 0, // the index of the current word
      author: "",
      wordArray: [], // keep track of all words in the quote
      currentWord: "",
      textWord: "",
      index: 0,
      maxIndex: 0,
      style: "text-box",
      start: 0,
    });
    console.log(this.state.date);
    let input = document.querySelector('input');
    input.value = "";
    isDone = 0;
    this.getQuote();
    input.focus();
    isStarted = 0;
    this.props.setTimer(false);
    this.props.setNumChars(0);
  }

  render() {

    const isFinished = () => {
      if (isDone){
        return (<p id='text'>Quote by: {this.state.author}</p>);
      }
      else {
        return null;
      }
    }

    const typingStyle = {
      textDecorationLine: 'underline',
    };

    return (
      <div>
        {/* <Timer isDone={isDone} started={this.state.start}/>  */}
        <div className="Text">
          {/* <p id="text">{this.state.quote}</p> */}
          <p id ="text">
          { // typed words appear green
            this.state.typed.map((word, id) => 

            <span style={{color: 'green'}} key={++id}>{word + " "}</span>
            )
          }
          <span style={{textDecorationLine: 'underline'}}>{this.state.currentWord}</span>
          <span> </span>
          { // untyped words appear black
            this.state.toType.map((word, id) => 

            <span style={{color: 'black'}} key={++id}>{word + " "}</span>
            )
          }
          </p>
          {isFinished()}
          <input id={this.state.style} className='textbox' type="text" onChange={this.handleTextValue} />
        </div>  
        <div id="restart" onClick={() => this.resetValues()}>
          <p className='restart'><b>Restart</b></p>
        </div>
      </div>
    );
  }
}
