import styled from "styled-components";
import { DARK_GRAYISH_ORANGE } from "../../theme";

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  color: ${DARK_GRAYISH_ORANGE};
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  
  label {
    cursor: pointer;
    margin-bottom: 10px;
    span {
      font-family: "Roboto Slab", serif;
      font-size: 16px;
      color: #f4ede8;
      margin-left: 10px;
    }
  }
`;
