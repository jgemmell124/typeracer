import TextToType from "./TextToType";
import { useState } from 'react';
import Timer2 from "./Timer2";
import ProgressBar from "./ProgressBar";


export default function Racer() {

  // this is all to pass information from sibling components
  // to be able to start and stop timer from whenver
  const [timer, setTimer] = useState(false);
  // set the number of characters
  const [numChars, setNumChars] = useState(0);
  // determines when it is finished
  const [isFinished, setIsFinished] = useState(false);
  // total characters in the quote to figure out progress bar
  const [totalChars, setTotalChars] = useState(0);


  return (
    
    <div>
      <Timer2 timer={timer} numChars={numChars} isFinished={isFinished}/>
      <ProgressBar numChars={numChars} totalChars={totalChars} />
      <TextToType setTimer={setTimer} numChars={numChars} 
      setTotalChars={setTotalChars} setNumChars={setNumChars} setIsFinished={setIsFinished}/> 
    </div>

  );
}

