import React from 'react';

import { SubmitButton } from './styles';

export function Submit({ action, children, disabled }) {
	return (
		<SubmitButton onClick={action} disabled={disabled}>
			{children}
		</SubmitButton>
	);
}
