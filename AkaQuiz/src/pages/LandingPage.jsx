import { useState } from 'react';
import GameModal from '../components/GameModal';
import Quiz from '../components/Quiz';
import { useTimer } from '../hooks/useTimer';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { timeLeft, startTimer, resetTimer, isActive } = useTimer(120);

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

  // Handle restarting the game
  const handleRestartGame = () => {
    resetTimer(); // Reset the timer
    setIsGameStarted(true); // Start the game immediately
    startTimer(); // Restart the timer
  };

  // Handle returning to the landing page
  const handleReturnHome = () => {
    resetTimer(); // Reset the timer
    setIsGameStarted(false); // Return to landing page
    setShowModal(false); // Hide the modal if it was shown
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!isGameStarted ? (
        <>
          <h1 className="mb-8 text-4xl font-bold">Bienvenido sur le Quiz !</h1>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleStartGame}
          >
            Commencer
          </button>
        </>
      ) : (
        <Quiz
          timeLeft={timeLeft}
          isActive={isActive}
          onRestart={handleRestartGame}
          onReturnHome={handleReturnHome}
        />
      )}

      {showModal && <GameModal onGameStart={handleGameStart} onClose={handleCloseModal} />}
    </div>
  );
};

export default LandingPage;
