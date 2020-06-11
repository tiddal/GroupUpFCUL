import React from 'react';

import { SubmitButton, ButtonContainer, DangerButtonContainer } from './styles';

export function Submit({ action, children, disabled }) {
	return (
		<SubmitButton onClick={action} disabled={disabled}>
			{children}
		</SubmitButton>
	);
}

export function DangerButton({ action, children, disabled }) {
	return (
		<DangerButtonContainer onClick={action} disabled={disabled}>
			{children}
		</DangerButtonContainer>
	);
}

export default function Button({ action, children, disabled }) {
	return (
		<ButtonContainer onClick={action} disabled={disabled}>
			{children}
		</ButtonContainer>
	);
}
