import React from 'react';

import { Container, InputField, Label, Error } from './styles';

function Input({ id, type, label, validation, error, change, value }) {
	return (
		<Container error={error}>
			<InputField type={type} id={id} onChange={change} value={value} />
			<Label htmlFor={id}>
				{label}:{validation.required && ' (*)'}
			</Label>
			<Error>{error}</Error>
		</Container>
	);
}

export default Input;
