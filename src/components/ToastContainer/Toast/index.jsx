import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { useToast } from '../../../hooks/toast';
import { Container } from './styles';


const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message && message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message]);

  return (
    <Container
      type={message && message.type}
      hasDescription={!!(message && message.description)}
      style={style}
    >
      {icons[(message && message.type) || 'info']}
      <div>
        <strong>{message && message.title}</strong>
        {message && message.description && <p>{message && message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message && message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
