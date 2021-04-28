import styled from 'styled-components';
import { SECONDARY_COLOR, LIGHT_BACKGROUND_COLOR } from '../../theme';
import { shade } from 'polished';

export const Container = styled.button`
  background:${SECONDARY_COLOR};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: ${LIGHT_BACKGROUND_COLOR};
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, SECONDARY_COLOR)};
  }
`;