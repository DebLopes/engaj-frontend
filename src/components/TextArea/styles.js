import styled, { css } from 'styled-components';
import { SECONDARY_COLOR, DARK_GRAYISH_ORANGE } from '../../theme';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: ${DARK_GRAYISH_ORANGE};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color:${SECONDARY_COLOR};
      border-color:${SECONDARY_COLOR};
    `}

  ${props =>
    props.isFilled &&
    css`
      color:${SECONDARY_COLOR};
    `}

  textArea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: ${DARK_GRAYISH_ORANGE};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;