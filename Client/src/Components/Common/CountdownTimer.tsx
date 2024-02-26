import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Formatting the time left into MM:SS or HH:MM:SS etc.
  const formatTimeLeft = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    const paddedHours = `${hours}`.padStart(2, "0");
    const paddedMinutes = `${minutes}`.padStart(2, "0");
    const paddedSeconds = `${seconds}`.padStart(2, "0");
    return `${
      days ? `${days}:` : ""
    }${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="text-center">
      <div className="text-lg">{new Date(targetDate).toLocaleDateString()}</div>
      <div className="text-2xl font-semibold mt-8">{formatTimeLeft()}</div>
    </div>
  );
};

export default CountdownTimer;
