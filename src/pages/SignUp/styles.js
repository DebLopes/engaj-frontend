import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { SECONDARY_COLOR } from '../../theme';

import signUpBackground from '../../assets/sign-up-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  img {
    width: 40%;
  }
  
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  

  > a {
    color:${SECONDARY_COLOR};
    display: block;
    margin-top: 10%;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, SECONDARY_COLOR)};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
  span {
    color: #f4ede8;
    background-color: black;
    padding: 5px;
    border-radius: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 12px;
    a {
      padding-left: 5px;
      padding-right: 5px;
      color: ${SECONDARY_COLOR};
    }
  }
`;
