import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
  } from 'react';
  import { FiAlertCircle } from 'react-icons/fi';
  import { useField } from '@unform/core';
  
  import { Container, Error } from './styles';

  const TextArea = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
  
    const { fieldName, defaultValue, error, registerField } = useField(name);
  
    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);
  
    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
  
      setIsFilled(!!inputRef.current?.value);
    }, []);
  
    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);
  
    return (
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        {Icon && <Icon size={20} />}
        <textarea rows="5"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
          type="text"
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    );
  };
  
  export default TextArea;
  