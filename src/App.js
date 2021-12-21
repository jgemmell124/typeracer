import TextToType from "./Components/TextToType";
import Restart from "./Components/Restart";
import Timer from "./Components/Timer";
import { useState } from 'react';
import Timer2 from "./Components/Timer2";

function App() {

  // this is all to pass information from sibling components
  // to be able to start and stop timer from whenver
  const [timer, setTimer] = useState(false);
  // set the number of characters
  const [numChars, setNumChars] = useState(0);
  // determines when it is finished
  const [isFinished, setIsFinished] = useState(false);

  return (
    // [show progress bar]
    
    <div>
      <Timer2 timer={timer} numChars={numChars} isFinished={isFinished}/>
      {/* <Timer timer={timer} numChars={numChars} /> */}
      <TextToType setTimer={setTimer} numChars={numChars} setNumChars={setNumChars} setIsFinished={setIsFinished}/>
      
    </div>

  );
}

export default App;
