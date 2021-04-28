import React from "react";
import { FiChevronDown } from "react-icons/fi";

const Accordion = ({title, setAccordionOpen, accordionOpen}) => {
  return (
    <Accordion onClick={() => setAccordionOpen(!accordionOpen)}>
      <strong>{title}</strong>
      <FiChevronDown />
    </Accordion>
  );
};

export default Accordion;
