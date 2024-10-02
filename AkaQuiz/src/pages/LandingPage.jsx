import { useState } from 'react';
import GameModal from '../components/GameModal';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleStartGame = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Quiz Game!</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleStartGame}
      >
        Start Game
      </button>

      {showModal && <GameModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default LandingPage;
