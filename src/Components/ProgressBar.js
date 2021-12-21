import React, { useState, useEffect } from 'react';
import '../Styles/ProgressBar.css';
import Car from "../images/sports-car-clip-art.png";

// this will be like a progress bar
export default function ProgressBar(props) {
  
  const [padding, setPadding] = useState(10);
  var percent = Math.ceil(((props.numChars) / props.totalChars) * 90);
  
  useEffect(() => {
    setPadding(percent);
  }, [padding, props.numChars]); 

  return (
    <div className='Progress'>
      <img src={Car} className='Racer' style={{paddingLeft: `${padding}%`}} />
    </div>
  );
}