import {Container} from './styles.js';

const Modal = props => {
  const { close } = props;

  return (
    <Container>
      <div>
        {props.children}                        
        <button type="button" onClick={close}>
          <img src="/icons/close.svg" alt='close'/>
        </button>
      </div>
    </Container>
  );
}

export default Modal;