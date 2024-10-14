// src/components/GameModal.jsx
import PropTypes from "prop-types";
import Modal from "./foundations/Modal";
import Button from "./foundations/Button";
import BodyText from "./foundations/BodyText";

const GameModal = ({ onGameStart, onClose }) => {
  return (
    <Modal
      title="Comment jouer à Akaquiz ?"
      content={
        <BodyText variant="paragraph">
          Lorsque vous lancez une partie, un compte à rebours de 2 minutes démarre. Une définition de mot, tirée du dictionnaire, s'affiche à l'écran, et votre objectif est de deviner le mot correspondant. Tapez votre réponse dans la barre prévue à cet effet et validez. Si votre réponse est correcte, vous gagnez des points et une nouvelle définition apparaît. En cas d'erreur, vous pouvez réessayer autant de fois que nécessaire. Si vous le souhaitez, vous pouvez passer au mot suivant sans subir de pénalité. À la fin de la partie, vous pouvez sauvegarder votre score en vous inscrivant ou en vous connectant.
        </BodyText>
      }
      onClose={onClose}
    >
      <div className="flex justify-between mt-6">
        <Button label="Commencer" onClick={onGameStart} variant="primary" />
      </div>
    </Modal>
  );
};

GameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
};

export default GameModal;
