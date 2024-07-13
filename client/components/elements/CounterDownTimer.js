import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ time }) => {
  // Convert futureTime to Date object
  let givenTime1 = new Date(time);
  let futureTime1 = givenTime1 && new Date(givenTime1.getTime() + 15 * 60 * 60 * 1000);

  const futureDate = new Date(futureTime1);

  // Calculate initial time remaining in seconds
  const calculateTimeRemaining = () => {
    const currentTime = new Date().getTime();
    const timeRemaining = futureDate.getTime() - currentTime;
    return Math.floor(timeRemaining / 1000); // Convert milliseconds to seconds
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  
  return (
    (hours <=0 && minutes <= 0 && seconds <=0 )?
    <span className='font-semibold capitalize mt-3'>{`Time Expire`}</span>:
        <span className='font-semibold capitalize mt-3'>{`${hours}h ${minutes}m ${seconds}s`}</span>
    
  );
};

export default CountdownTimer;
