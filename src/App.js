import TextToType from "./Components/TextToType";
import Restart from "./Components/Restart";
import Timer from "./Components/Timer";
import { useState } from 'react';

function App() {

  // this is all to pass information from sibling components
  // to be able to start and stop timer from whenver
  const [timer, setTimer] = useState(false);
  // set the number of characters
  const[numChars, setNumChars] = useState(0);
  console.log(timer);
  return (
    // [show progress bar]
    
    <div>
      <Timer timer={timer} numChars={numChars} />
      <TextToType setTimer={setTimer} numChars={numChars} setNumChars={setNumChars}/>
      
    </div>

  );
}

export default App;
