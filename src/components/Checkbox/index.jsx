
import React from 'react'

import {
	CheckboxContainer,
	HiddenCheckbox,
	StyledCheckbox,
	Icon
} from './styles'

const Checkbox = ({ className, checked, disabled, ...props }) => {
	return (
		<CheckboxContainer className={className}>
			<HiddenCheckbox checked={checked} disabled={disabled} {...props} />
			<StyledCheckbox checked={checked} disabled={disabled}>
				<Icon viewBox="0 4 24 24">
					<polyline points="20 6 9 17 4 12" />
				</Icon>
			</StyledCheckbox>
		</CheckboxContainer>
	);
}

export default Checkbox;
