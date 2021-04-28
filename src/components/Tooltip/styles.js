import styled from 'styled-components';
import { SECONDARY_COLOR, LIGHT_BACKGROUND_COLOR } from '../../theme';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background:${SECONDARY_COLOR};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    color: ${LIGHT_BACKGROUND_COLOR};

    &::before {
      content: '';
      border-style: solid;
      border-color: ${SECONDARY_COLOR} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
