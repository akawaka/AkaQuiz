import PropTypes from 'prop-types';

const GameModal = ({ onGameStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">How to Play</h2>
        <p className="mb-4">
          Vous avez 2 minutes pour répondre le plus de questions possible. Essayez de faire le plus de points !
        </p>
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Fermer
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={onGameStart}
          >
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
};

GameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
};

export default GameModal;
