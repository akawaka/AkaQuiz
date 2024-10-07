import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TimerProgress = ({
  timeLeft,
  totalTime,
  otterImage,
  cartoonTroutImage,
}) => {
  const [progressBarWidth, setProgressBarWidth] = useState("100%");

  useEffect(() => {
    const progress = (timeLeft / totalTime) * 100;
    setProgressBarWidth(`${progress}%`);
  }, [timeLeft, totalTime]);

  return (
    <div className="flex flex-col items-center justify-center pt-8 w-96">
      <div className="relative w-full">
        {/* Otter Image */}
        <div className="absolute z-40 -top-7 -left-6">
          <img className="w-16 h-16" src={otterImage} alt="Otter" />
        </div>
        {/* Moving Trout Image */}
        <div
          className="absolute z-30 w-8 h-8 transform -translate-x-1/2 -top-3"
          style={{
            left: progressBarWidth,
            transition: "left 1s linear",
          }}
        >
          <img
            className="w-full h-full transition-transform duration-300 animate-wiggle"
            src={cartoonTroutImage}
            alt="Trout"
          />
        </div>

        {/* Green Progress Bar */}
        <div
          className="absolute inset-0 top-0 z-10 h-3 bg-green-500 rounded-full"
          style={{
            width: progressBarWidth,
            transition: "width 1s linear",
          }}
        ></div>

        {/* Background Gray Bar */}
        <div className="absolute inset-0 top-0 h-3 bg-gray-300 rounded-full"></div>

        {/* Dividers */}
        <div className="absolute left-[16.6%] h-3 bg-white w-px z-20"></div>
        <div className="absolute left-[33.3%] h-3 bg-white w-px z-20"></div>
        <div className="absolute left-[49.9%] h-3 bg-white w-px z-20"></div>
        <div className="absolute left-[66.5%] h-3 bg-white w-px z-20"></div>
        <div className="absolute left-[83.3%] h-3 bg-white w-px z-20"></div>
      </div>
      <div className="flex items-center justify-center pt-8">
        <span className="font-bold text-gray-800">{timeLeft} secondes restantes</span>
      </div>
    </div>
  );
};

TimerProgress.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  otterImage: PropTypes.string.isRequired,
  cartoonTroutImage: PropTypes.string.isRequired,
};

export default TimerProgress;
