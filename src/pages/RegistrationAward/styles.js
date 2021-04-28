import styled, { css } from "styled-components";
import {
  SECONDARY_COLOR,
  STRONG_BACKGROUND_COLOR,
  VERY_DARK_GRAYISH_BLUE_COLOR,
  LIGHT_BACKGROUND_COLOR,
} from "../../theme";
import { shade } from "polished";

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: ${STRONG_BACKGROUND_COLOR};
`;

export const RegisterNewTask = styled.div`
  display: flex;
  width: 100%;

  SVG {
    margin-left: 10px;
    width: 20px;
    height: 20px;
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
  margin-left: 80px;
  flex-direction: column;

  > strong {
    margin-top: 10px;
    max-width: 300px;
    text-align: justify;
    color: #f4ede8;
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    margin-top: 20px;
    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: ${SECONDARY_COLOR};

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: ${SECONDARY_COLOR};
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: "";
      width: 1px;
      height: 12px;
      background: ${SECONDARY_COLOR};
      margin: 0 8px;
    }
  }
`;

export const Section = styled.section`
  margin-top: 30px;

  > div {
    display: flex;
    justify-content: space-between;
    line-height: 26px;
    border-bottom: 1px solid ${VERY_DARK_GRAYISH_BLUE_COLOR};
    padding-bottom: 16px;
    margin-bottom: 16px;

    > strong {
      display: block;
      color: #999591;
      align-content: center;
      font-size: 20px;
    }
  }
  > p {
    color: #999591;
  }
`;

export const Accordion = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${VERY_DARK_GRAYISH_BLUE_COLOR};
  padding-bottom: 16px;
  margin-bottom: 16px;

  > strong {
    color: #999591;
    font-size: 20px;

    display: block;
  }

  > p {
    color: #999591;
  }
`;

export const Goals = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: ${VERY_DARK_GRAYISH_BLUE_COLOR};
  border-radius: 10px;

  & + div {
    margin-top: 16px;
  }

  p {
    color: #999591;
    font-size: 14px;
    text-align: justify;
  }

  h6 {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${SECONDARY_COLOR};
  }

  button {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
    margin-bottom: 20px;

    svg {
      color: ${SECONDARY_COLOR};
      margin-right: 10px;
    }
    span {
      color: ${SECONDARY_COLOR};
      padding: 0px;
      font-size: 12px;
      font-weight: normal;
    }
  }

  div {
    margin-bottom: 5px;

    strong {
      margin-left: 10px;
      color: #f4ede8;
      font-size: 16px;
      font-weight: 300;
    }
  }
`;

export const GoalsTitle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  span {
    display: flex;
    flex: 1;
    color: #f4ede8;
    SVG {
      color: ${SECONDARY_COLOR};
      margin-right: 20px;
    }
  }
  button {
    margin: 0;
    SVG {
      color: ${SECONDARY_COLOR};
      margin-left: 20px;
    }
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  width: 40%;
  span {
    font-size: 14px;
  }
  > div {
    flex: 1;
    height: 4px;
    border-radius: 4px;
    background: ${STRONG_BACKGROUND_COLOR};
    margin-right: 1rem;
    position: relative;

    div {
      height: 4px;
      border-radius: 4px;
      background: ${SECONDARY_COLOR};

      transition: ${(props) => props.width && props.width`0.4s`};
    }
  }
`;

export const TodoIst = styled.div`
  display: flex;
  svg {
    margin-left: 5px;
  }

  button {
    margin-left: 20px;
    background: transparent;
    border: 0;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  width: 400px;
  /* width: ${(props) => {
    switch (props.size) {
      case "lg":
        return "800";
      default:
        return "480";
    }
  }}px; */
  margin: 40px auto;
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

export const Award = styled.div`
  display: flex;

  p {
    margin: 0px;
    svg {
      margin-right: 5px;
    }
  }

  span {
    align-self: center;
  }

  > button {
    background: ${SECONDARY_COLOR};
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: ${LIGHT_BACKGROUND_COLOR};
    width: 30%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, SECONDARY_COLOR)};
    }
  }
`;

export const CreateAward = styled.button`
  display: flex;
  align-items: center;
  color: ${SECONDARY_COLOR};
  text-decoration: none;
  font-size: 16px;
  background-color: transparent;
  border: 0;

  SVG {
    color: ${SECONDARY_COLOR};
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }
`;
