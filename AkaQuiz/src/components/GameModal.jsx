// src/components/GameModal.jsx
import PropTypes from 'prop-types';
import Modal from './foundations/Modal';
import Button from './foundations/Button';

const GameModal = ({ onGameStart, onClose }) => {
  return (
    <Modal
      title="Comment jouer ?"
      content="Vous avez 2 minutes pour répondre le plus de questions possible. Essayez de faire le plus de points !"
      onClose={onClose}
    >
      <div className="flex justify-between mt-6">
        <Button
          label="Commencer"
          onClick={onGameStart}
          variant="primary"
        />
      </div>
    </Modal>
  );
};

GameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
};

export default GameModal;
