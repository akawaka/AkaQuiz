import { useState } from "react";
import { useTimer } from "../hooks/useTimer";
import GameModal from "../components/GameModal";
import Quiz from "../components/Quiz";
import Leaderboard from "../components/Leaderboard";
import Button from "../components/foundations/Button";
import Card from "../components/foundations/Card";
import Heading from "../components/foundations/Heading";
import logoLobster from "../assets/logo_lobster.png";
import bgSvg from "../assets/bg.svg";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const { timeLeft, startTimer, isActive, resetTimer } = useTimer(183);

  const handleStartGame = () => {
    setShowModal(true);
  };

  const handleGameStart = () => {
    setShowModal(false);
    setIsGameStarted(true);
    startTimer();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToggleLeaderboard = () => {
    setIsLeaderboardVisible((prevVisible) => !prevVisible);
  };

  const handleRestart = () => {
    resetTimer();
    handleGameStart();
  };

  return (
    <div className="h-screen bg-center bg-cover" style={{ backgroundImage: `url(${bgSvg})` }}>
      <div className="flex items-center justify-center h-screen max-w-5xl mx-auto">
        {!isGameStarted && !isLeaderboardVisible ? (
          <div className="relative px-4 text-center max-w-prose">
            <Card>
              <div className="absolute top-0 w-60 left-1/2">
                <img src={logoLobster} alt="AkaQuiz Logo" className="absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 bg-cover" />
              </div>
              <div className="pt-24">
                <Heading level={1}>AkaQuiz</Heading>
              </div>
              <div className="pt-4">
                <Heading level={4}>Des centaines de mots à découvrir, des définitions à déchiffrer, êtes-vous prêt à relever le défi ?</Heading>
              </div>
              <div className="flex justify-center pt-12 space-x-4">
                <Button
                  label="Commencer"
                  onClick={handleStartGame}
                  variant="primary"
                />
                <Button
                  label="Voir le Classement"
                  onClick={handleToggleLeaderboard}
                  variant="soft"
                />
              </div>
            </Card>
          </div>
        ) : isLeaderboardVisible ? (
          <Leaderboard onClose={handleToggleLeaderboard} />
        ) : (
          <Quiz
            timeLeft={timeLeft}
            isActive={isActive}
            onRestart={handleRestart}
          />
        )}

        {showModal && (
          <GameModal onGameStart={handleGameStart} onClose={handleCloseModal} />
        )}
      <div className="absolute transform -translate-x-1/2 bottom-6 left-1/2">
        <a href="https://www.akawaka.fr/" target="_blank" className="flex items-center px-4 space-x-4 transition duration-300 ease-out border border-transparent rounded-full hover:bg-white hover:shadow-xl">
            <span className="text-xs italic font-bold text-slate-800">
              Made by
            </span>
            <svg className="h-16 w-28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434.84 189.6">
              <defs>
                <style>
                  {`
                    .cls-1, .cls-2 { fill: none; }
                    .cls-1 { stroke: #000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 5px; }
                    .cls-2 { stroke-miterlimit: 10; stroke-width: 3px; stroke: url(#Gradient_52); }
                  `}
                </style>
                <linearGradient id="Gradient_52" y1="94.8" x2="144.89" y2="94.8" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#de1e7e" />
                  <stop offset="1" stopColor="#f29e19" />
                </linearGradient>
              </defs>
              <title>File 11</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1" data-name="Layer 1">
                  <line className="cls-1" x1="47.51" y1="121.15" x2="67.13" y2="68.44" />
                  <polyline className="cls-1" points="66.36 99.22 81.75 99.22 92.53 120.77" />
                  <line className="cls-1" x1="276.72" y1="121.15" x2="296.34" y2="68.44" />
                  <polyline className="cls-1" points="295.57 99.22 310.96 99.22 321.74 120.77" />
                  <line className="cls-1" x1="387.33" y1="121.15" x2="406.95" y2="68.44" />
                  <polyline className="cls-1" points="406.18 99.22 421.57 99.22 432.34 120.77" />
                  <line className="cls-1" x1="158.11" y1="121.15" x2="177.74" y2="68.44" />
                  <polyline className="cls-1" points="176.97 99.22 192.36 99.22 203.13 120.77" />
                  <line className="cls-1" x1="110.91" y1="68.63" x2="110.91" y2="120.96" />
                  <polyline className="cls-1" points="139.73 70.17 117.84 93.15 139.73 119.42" />
                  <line className="cls-1" x1="340.12" y1="68.63" x2="340.12" y2="120.96" />
                  <polyline className="cls-1" points="368.94 70.17 347.05 93.15 368.94 119.42" />
                  <polyline className="cls-1" points="274.4 69.44 255.16 120.23 239.77 95.6 225.92 120.23 207.45 69.44" />
                  <polygon className="cls-2" points="142.77 139.5 94.8 187.48 2.12 94.8 94.8 2.12 141.68 49.01 140.27 50.42 94.8 4.95 4.95 94.8 94.8 184.65 141.35 138.09 142.77 139.5 142.77 139.5" />
                </g>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
