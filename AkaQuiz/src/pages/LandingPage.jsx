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
    <div className="h-screen bg-center bg-cover" style={{ backgroundImage: `url(${bgSvg})` }}>
      <div className="flex items-center justify-center h-screen max-w-5xl mx-auto">
        {!isGameStarted && !isLeaderboardVisible ? (
          <div className="relative text-center max-w-prose">
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
