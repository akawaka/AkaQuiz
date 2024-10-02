import PropTypes from 'prop-types';

const GameModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">How to Play</h2>
        <p className="mb-4">
          You have a limited time to answer as many questions as possible. Try
          your best to score the highest!
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

GameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default GameModal;
