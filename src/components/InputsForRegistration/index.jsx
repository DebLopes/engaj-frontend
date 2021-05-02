import React from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

import { Section } from "./styles";

const InputsForRegistration = props => {
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
			<Input name={nameFirstInput} placeholder={placeholderFirstInput} />
			<Input name={nameSecondInput} placeholder={placeholderSecondInput} />
			{nameTextArea &&
				<TextArea name={nameTextArea} placeholder={placeholderTextArea} />}
		</Section>
	);
};

export default InputsForRegistration;
