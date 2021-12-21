
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Timer2({timer, numChars, isFinished}) {
  const [count, setCount] = useState(0);
  const [didStart, setDidStart] = useState(0);  // keep track if game is in progress
  const [startDate, setStartDate] = useState(0);  // keep track of the number seconds since starting
  const [seconds, setSeconds] = useState(0);

  
  useEffect(() => {
    setTimeout(() => getTime(), 500);
  });


  function getTime() {
    console.log("timer value: " + timer)
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
      console.log("total seconds: " + totalSeconds);
    }
  }


  const displayWPM = () => {
    if (timer) {
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

  
  return (
    <div className="timer">
      <h1>Total Time: {seconds / 1000}</h1>
      {displayWPM()}
    </div>
  );
}
