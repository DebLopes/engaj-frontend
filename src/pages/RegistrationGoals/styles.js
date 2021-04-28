import styled from "styled-components";
import { shade } from "polished";
import {
  SECONDARY_COLOR,
  STRONG_BACKGROUND_COLOR,
  VERY_DARK_GRAYISH_BLUE_COLOR,
  DARK_GRAYISH_ORANGE,
} from "../../theme";

export const ContainerGoal = styled.div`
  display: flex;

  //margin-bottom: 14px;
`;


export const Container = styled.div`
  display: flex;
  margin-bottom: 14px;
`;

export const Header = styled.header`
  padding: 32px 0;
  background: ${STRONG_BACKGROUND_COLOR};
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
  // margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

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

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: ${VERY_DARK_GRAYISH_BLUE_COLOR};
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: ${SECONDARY_COLOR};
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: ${SECONDARY_COLOR};
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      //  margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: ${SECONDARY_COLOR};
        margin-right: 8px;
      }
    }
  }
`;

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

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: ${SECONDARY_COLOR};
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: ${VERY_DARK_GRAYISH_BLUE_COLOR};
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${SECONDARY_COLOR};
    }

    strong {
      margin-left: 16px;
      color: #f4ede8;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: ${STRONG_BACKGROUND_COLOR};
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${VERY_DARK_GRAYISH_BLUE_COLOR};
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, VERY_DARK_GRAYISH_BLUE_COLOR)};
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: ${SECONDARY_COLOR};
  }

  .DayPicker-Day--disabled {
    color: ${DARK_GRAYISH_ORANGE} !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background: ${SECONDARY_COLOR} !important;
    border-radius: 10px;
    color: #232129 !important;
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

export const RegisterNewTask = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;

  button {
    background-color: transparent;
    border: none;
    margin-left: 10px;
  }

  SVG {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    color: ${SECONDARY_COLOR};
  }
`;

export const ListGoal = styled.ul`
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;

  button {
    background-color: transparent;
    border: none;
    margin-left: 10px;
    color: ${SECONDARY_COLOR};
    margin-left: auto;

    SVG {
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 14px;
      vertical-align: text-top;
    }
  }
`;

export const AddNewTask = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 10px;

  button {
    background-color: transparent;
    border: none;
    margin-left: 10px;
    color: ${SECONDARY_COLOR};

    SVG {
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 14px;
      vertical-align: text-top;
    }
  }
`;

export const ListActions = styled.div`
  margin-top: 15px;
  ul {
    padding: 5px;
    margin-left: 20px;
    display: flex;
    li {
      width: 100%;
      font-size: 16px;
      color: #999591;
      padding-bottom: 5px;
    }
    button {
      background-color: transparent;
      border: none;

      SVG {
        margin-left: auto;
        width: 20px;
        height: 20px;
        color: ${SECONDARY_COLOR};
        cursor: pointer;
      }
    }
  }
`;

export const Progress = styled.div`
  width: 600px;
  margin: 100px auto;
  padding-bottom: 40px;
  ul {
    counter-reset: step;
    li {
      list-style-type: none;
      width: 25%;
      float: left;
      font-size: 12px;
      position: relative;
      text-align: center;
      text-transform: uppercase;
      color: #7d7d7d;
    }
    li:before {
      width: 30px;
      height: 30px;
      content: counter(step);
      counter-increment: step;
      line-height: 30px;
      border: 2px solid #7d7d7d;
      display: block;
      text-align: center;
      margin: 0 auto 10px auto;
      border-radius: 50%;
      background-color: white;
    }
    li:after {
      width: 100%;
      height: 2px;
      content: "";
      position: absolute;
      background-color: #7d7d7d;
      top: 15px;
      left: -50%;
      z-index: -1;
    }
    li:first-child:after {
      content: none;
    }
    li.active {
      color: ${SECONDARY_COLOR};
    }
    li.active:before {
      border-color: ${SECONDARY_COLOR};
    }
  }
`;

export const Select = styled.select`
  margin-left: 14px;

  background: #232129;
  border-radius: 10px;
  padding: 16px;
  flex: 1;
  border: 2px solid #232129;
  color: #fff;

  display: flex;
  align-items: center;

  option {
    color: #fff;
    background: #232129;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
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
