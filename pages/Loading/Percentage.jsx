import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularProgressBar = ({ percentage }) => {
  return (
    <div style={{ width: '150px', margin: 'auto' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          strokeLinecap: 'butt', // Other options include 'round' or 'square'
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: `rgba(255, 196, 0)`,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
