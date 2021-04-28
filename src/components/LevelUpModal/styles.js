import styled from "styled-components";
import signInBackground from "../../assets/levelup.svg";
import {LIGHT_BACKGROUND_COLOR} from '../../theme';

export const Modal = styled.div`
  background: rgba(242, 243, 245, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background: ${LIGHT_BACKGROUND_COLOR};
    width: 100%;
    max-width: 400px;
    padding: 2rem 3rem;
    border-radius: 5px;
    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.05);
    text-align: center;
    position: relative;

    header {
      font-size: 8.75rem;
      font-weight: 600;
      background: url(${signInBackground}) no-repeat center;
      background-size: contain;
    }

    strong {
      font-size: 2.25rem;
      color: var(--title);
    }

    p {
      font-size: 1.25rem;
      color: var(--text);
      margin-top: 0.25rem;
    }

    button {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      background: transparent;
      border: 0;
      font-size: 0px;
    }
  }
`;

// .overlay {
//   background: rgba(242, 243, 245, 0.8);
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   left: 0;

//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .content {
//   background: var(--white);
//   width: 100%;
//   max-width: 400px;
//   padding: 2rem 3rem;
//   border-radius: 5px;
//   box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.05);

//   text-align: center;

//   position: relative;
// }

// .content header {
//   font-size: 8.75rem;
//   font-weight: 600;
//   color: var(--blue);
//   background: url('../../assets/levelup.svg') no-repeat center;
//   background-size: contain;
// }

// .content strong {
//   font-size: 2.25rem;
//   color: var(--title);
// }

// .content p {
//   font-size: 1.25rem;
//   color: var(--text);
//   margin-top: 0.25rem;
// }

// .content button {
//   position: absolute;
//   right: 0.5rem;
//   top: 0.5rem;
//   background: transparent;
//   border: 0;
//   font-size: 0px;
// }
