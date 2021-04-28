import React from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

import { Section, ContainerGoal } from "./styles";

const GoalDescription = props => {
  const {
    nameFirstInput,
    placeholderFirstInput,
    nameSecondInput,
    placeholderSecondInput,
    nameTextArea,
    placeholderTextArea
  } = props;

  return (
    <Section>
      <ContainerGoal>
        <Input name={nameFirstInput} placeholder={placeholderFirstInput} />
        <Input name={nameSecondInput} placeholder={placeholderSecondInput} />
      </ContainerGoal>
      {nameTextArea &&
        <TextArea name={nameTextArea} placeholder={placeholderTextArea} />}
    </Section>
  );
};

export default GoalDescription;
