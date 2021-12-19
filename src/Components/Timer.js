import '../Styles/TextToType.css';
import { useState, useEffect } from "react";
import React from 'react';




export default function Timer({timer, numChars}) {
  

  const [count, setCount] = useState(0);
  //const [totalChars, setTotalChars] = useState(0);

  useEffect(() => {
    displayTimer();
    setTimeout(() => {
      if (!timer) {
        setCount(0);
      }
      else {
        setCount((count) => count + 1);
      }
    }, 1000);
  });


  const displayTimer = () => {
    if (timer) {
      return (
      <h1> 
        {count > 9 ? count : '0' + count}
      </h1>
      );}
    else {
      return(
        <h1> 
          {"00"}
        </h1>
        );}
    }

    // calculate the WPM based on words / time
    // the average word length in english is 5.1
    // so, the number of characters of the sentence / 5.1 = words.

    //TODO: WORDS TYPED SO FAR / 5.1 so it is not infinity.
    const displayWPM = () => {
      if (timer) {
        console.log("total characters: " + numChars);
        const words = Math.ceil(numChars / 5.1);
        console.log("total words: " + words);
        console.log("Count: " + count);
        return (
        <h1> 
          {"WPM: " + Math.ceil((words / count) * 60)}
        </h1>
        );}
      else {
        return(
          <h1> 
            {"WPM: 00"}
          </h1>
          );}
      }

  return (
    <div className="timer">
      {displayTimer()}
      {displayWPM()}
    </div>
  );
}



// const [time, setTime] = React.useState(0);
//   const [timerOn, setTimerOn] = React.useState(false);

//   React.useEffect(() => {
//     let interval = null;

//     if (timerOn) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime + 10);
//       }, 10);
//     } else if (!timerOn) {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [timerOn]);
  

//   if (props.started) {
//     setTimerOn(true);
//   }
//   else if (props.isDone) {
//     setTimerOn(false);  }
//   else {
//     setTime(0);
//   }









// const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
//   const [interv, setInterv] = useState();
//   const [status, setStatus] = useState(0);
//   // Not started = 0
//   // started = 1
//   // stopped = 2

//   const start = () => {
//       run();
//       setStatus(1);
//       setInterv(setInterval(run, 10000));
//   };

//   var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

//   const run = () => {
//     if(updatedM === 60){
//       updatedH++;
//       updatedM = 0;
//     }
//     if(updatedS === 60){
//       updatedM++;
//       updatedS = 0;
//     }
//     if(updatedMs === 100){
//       updatedS++;
//       updatedMs = 0;
//     }
//     updatedMs++;
//     return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
//   };

//   const stop = () => {
//     clearInterval(interv);
//     setStatus(2);
//   };

//   const reset = () => {
//     clearInterval(interv);
//     setStatus(0);
//     setTime({ms:0, s:0, m:0, h:0})
//   };

//   const resume = () => start();

// let [minutes, setMinutes] = useState(0);
    // let [hours, setHours] = useState(0);
    // let [seconds, setSeconds] = useState(0);
    // let [days, setDays] = useState(0);
    // var start = props.date;
    // var isDone = props.isDone;


    // console.log(isDone);

    // function countdown() {
    //   if (isDone == 0) {
    //     console.log("test");
    //     var nowDate = new Date();
    //     var totalSeconds = (nowDate - start) / 1000;
    //     var days = Math.floor(totalSeconds / 3600 / 24);
    //     var hours = Math.floor(totalSeconds / 3600) % 24;
    //     var minutes = Math.floor(totalSeconds / 60) % 60;
    //     var seconds = Math.floor(totalSeconds) % 60;
  
    //     setDays(days);
    //     setHours(hours);
    //     setMinutes(minutes);
    //     setSeconds(seconds);
        
    //   }
    // }
    
    // setInterval(countdown, 1000);