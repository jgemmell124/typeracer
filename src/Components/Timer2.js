
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Timer2({timer, numChars, isFinished}) {
  const [count, setCount] = useState(0);
  const [didStart, setDidStart] = useState(0);  // keep track if game is in progress
  const [startDate, setStartDate] = useState(0);  // keep track of the number seconds since starting
  const [seconds, setSeconds] = useState(0);
  const [score, setScore ] = useState(0);
  
  
  useEffect(() => {
    setTimeout(() => getTime(), 500);
  });

  // useEffect(() => {
  //   const words = Math.ceil(numChars / 5.1);
  //   let currentScore = Math.ceil((words / (seconds)) * 60000);
  //   if (currentScore > score) {
  //     setScore(currentScore);
  //   }
  // }, [numChars]);


  function getTime() {
    //console.log("timer value: " + timer)
    // if the game is reset
    if (!timer) {
      setCount(0);
      setDidStart(0);
      setSeconds(0);
    }
    // if the game is just started
    else if (!didStart && timer) {
      // get current time
      const now = new Date();
      setStartDate(now.getTime());
      setDidStart(1);
    }
    // update the number of seconds since starting
    else if (!isFinished) {
      const currentDate = new Date();
      let totalSeconds = currentDate.getTime() - startDate;
      setSeconds(totalSeconds);
      //console.log("total seconds: " + totalSeconds);
    }
    else {
      const words = Math.ceil(numChars / 5.1);
      let currentScore = Math.ceil((words / (seconds)) * 60000);
      if (currentScore > score) {
        setScore(currentScore);
      }
    }
  }





  const displayWPM = () => {
    if (timer && (seconds / 1000) > .5) {
      const words = Math.ceil(numChars / 5.1);
      return (
      <h1> 
        {"WPM: " + Math.ceil((words / (seconds)) * 60000)}
      </h1>
      );}
    else {
      return(
        <h1> 
          {"WPM: 00"}
        </h1>
        );}   
    }

    const displayStartMessage = () => {
      if (!didStart) {
        return (<h1 style={{textAlign: "center"}}> Type to Start</h1>)
      }
      else if (isFinished) {
        return (<h1 style={{textAlign: "center"}}> Press 'Restart' to Play Again</h1>)
      }
      else if (timer) {
        return (<h1 style={{textAlign: "center"}}> Type to the finish line!</h1>)
      }
    }
  
  return (
    <div className="timer">
      <h1>Total Time: {seconds / 1000}</h1>
      {displayWPM()}
      <h1>
        Best Speed: {score}  <button onClick={(() => setScore(0))}>Reset Score</button>
      </h1>
      {displayStartMessage()}
    </div>
  );
}
