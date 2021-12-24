import React, { useState, useEffect } from 'react';
import '../Styles/ProgressBar.css';
import Car from "../images/sports-car-clip-art.png";
import Tooltip from '@mui/material/Tooltip';

// this will be like a progress bar
export default function ProgressBar(props) {
  
  const [padding, setPadding] = useState(0);
  var percent = Math.ceil(((props.numChars) / props.totalChars) * 90);
  
  useEffect(() => {
    setPadding(percent);
  }, [padding, props.numChars]); 

  return (
    <div className='Progress'>
      <Tooltip title="Guest Racer">
        <img src={Car} className='Racer' style={{paddingLeft: `${padding}%`, paddingTop: '5px', transform: 'scale(1)', transition: '0.15s all ease'}} />
      </Tooltip>
    </div>
  );
}