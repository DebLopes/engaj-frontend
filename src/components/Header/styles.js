import styled from "styled-components";
import {
  SECONDARY_COLOR,
  STRONG_BACKGROUND_COLOR
} from "../../theme";


export const Container = styled.header`
  padding: 14px 0;
  background: ${STRONG_BACKGROUND_COLOR};
`;

export const RegisterNewTask = styled.div`
  display: flex;
  width: 100%;

  SVG {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    color: ${SECONDARY_COLOR};
  }
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: 50px;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 20%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    p {
      color: ${SECONDARY_COLOR};
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;

  a {
    margin-right: 30px;
    text-decoration: none;
    color: ${SECONDARY_COLOR};

    &:hover {
      opacity: 0.8;
    }
  }
`;


