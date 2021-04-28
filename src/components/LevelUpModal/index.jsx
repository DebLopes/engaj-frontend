import {Modal} from './styles.js';
import { FaTrophy } from 'react-icons/fa';

const LevelUpModal = props => {
  const { level, closeLevelUpModal } = props;

  return (
    <Modal>
      <div>
        <header><FaTrophy/></header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" />
        </button>
      </div>
    </Modal>
  );
}

export default LevelUpModal;