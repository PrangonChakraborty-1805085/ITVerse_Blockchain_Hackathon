import React, { useState, useEffect } from "react";

const Timer = ({ time }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Set the deadline in seconds from today
  const deadlineInSeconds = time; // Example: 1 day from today
  const startTime = Math.floor(Date.now() / 1000); // Current time in seconds
  let endTime = startTime + deadlineInSeconds;

  const getTime = () => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    let remainingTimeInSeconds = endTime - currentTime;
    if (remainingTimeInSeconds < 0) remainingTimeInSeconds = 0;

    setDays(Math.floor(remainingTimeInSeconds / (60 * 60 * 24)));
    setHours(Math.floor((remainingTimeInSeconds / (60 * 60)) % 24));
    setMinutes(Math.floor((remainingTimeInSeconds / 60) % 60));
    setSeconds(remainingTimeInSeconds % 60);
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: "20px" }}>
      <span className="text-black mt-2">Time remaining : </span>
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;
