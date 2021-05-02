import styled from "styled-components";
import {
  VERY_DARK_GRAYISH_BLUE_COLOR
} from "../../theme";


export const Section = styled.section`
  margin-top: 48px;
  margin-bottom: 30px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid ${VERY_DARK_GRAYISH_BLUE_COLOR};
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;
