import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Heading from "./foundations/Heading";

const TimerProgress = ({
  timeLeft,
  totalTime,
  lighthouseImage,
  lobsterImage,
}) => {
  const [progressBarWidth, setProgressBarWidth] = useState("100%");

  useEffect(() => {
    const progress = (timeLeft / totalTime) * 100;
    setProgressBarWidth(`${progress}%`);
  }, [timeLeft, totalTime]);

  return (
    <div className="flex flex-col items-center justify-center pt-16 w-96">
      <div className="relative w-full">
        {/* Otter Image */}
        <div className="absolute z-20 -top-5 -left-6">
          <img className="w-20 h-20 transform -translate-y-1/2" src={lighthouseImage} alt="Otter" />
        </div>
        {/* Moving Trout Image */}
        <div
          className="absolute z-30 w-10 h-10 transform -translate-x-1/2 -top-3"
          style={{
            left: progressBarWidth,
            transition: "left 1s linear",
          }}
        >
          <img
            className="w-full h-full transition-transform duration-300 animate-wiggle"
            src={lobsterImage}
            alt="Trout"
          />
        </div>

        {/* Green Progress Bar */}
        <div
          className="absolute inset-0 top-0 z-10 h-3 bg-indigo-400 rounded-full"
          style={{
            width: progressBarWidth,
            transition: "width 1s linear",
          }}
        ></div>

        {/* Background Gray Bar */}
        <div className="absolute inset-0 top-0 h-3 rounded-full bg-slate-300"></div>

        {/* Dividers */}
        <div className="absolute left-[16.6%] h-3 bg-white w-px z-10"></div>
        <div className="absolute left-[33.3%] h-3 bg-white w-px z-10"></div>
        <div className="absolute left-[49.9%] h-3 bg-white w-px z-10"></div>
        <div className="absolute left-[66.5%] h-3 bg-white w-px z-10"></div>
        <div className="absolute left-[83.3%] h-3 bg-white w-px z-10"></div>
      </div>
      <div className="flex items-baseline justify-center pt-16 space-x-2">
        <Heading level={2}>
          {timeLeft}
        </Heading>
        <Heading level={4}>
          secondes restantes
        </Heading>
      </div>
    </div>
  );
};

TimerProgress.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  lighthouseImage: PropTypes.string.isRequired,
  lobsterImage: PropTypes.string.isRequired,
};

export default TimerProgress;
