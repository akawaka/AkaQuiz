import { useState } from "react";
import { useTimer } from "../hooks/useTimer";
import GameModal from "../components/GameModal";
import Quiz from "../components/Quiz";
import Leaderboard from "../components/Leaderboard";
import Button from "../components/foundations/Button";
import Card from "../components/foundations/Card";
import Heading from "../components/foundations/Heading";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const { timeLeft, startTimer, resetTimer, isActive } = useTimer(30);

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

  const handleRestartGame = () => {
    resetTimer();
    setIsGameStarted(true);
    startTimer();
  };

  const handleReturnHome = () => {
    resetTimer();
    setIsGameStarted(false);
    setShowModal(false);
  };

  const handleToggleLeaderboard = () => {
    setIsLeaderboardVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="flex items-center justify-center h-screen mx-auto max-w-7xl">
        {!isGameStarted && !isLeaderboardVisible ? (
          <div className="">
            <Card>
              <Heading level={1}>Bienvenido sur le Quiz !</Heading>
              <div className="flex justify-center pt-12 space-x-4">
                <Button
                  label="Commencer"
                  onClick={handleStartGame}
                  variant="primary"
                />
                <Button
                  label="Voir le Leaderboard"
                  onClick={handleToggleLeaderboard}
                  variant="secondary"
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
            onRestart={handleRestartGame}
            onReturnHome={handleReturnHome}
          />
        )}

        {showModal && (
          <GameModal onGameStart={handleGameStart} onClose={handleCloseModal} />
        )}
      </div>

    </div>
  );
};

export default LandingPage;
