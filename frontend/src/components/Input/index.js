import React from 'react';

import { Container, InputField, Label, Info } from './styles';

function Input({
	id,
	type,
	label,
	validation,
	error,
	info,
	change,
	value,
	danger,
}) {
	return (
		<Container error={error} danger={danger}>
			<InputField type={type} id={id} onChange={change} value={value} />
			<Label htmlFor={id}>
				{label}:{validation.required && ' (*)'}
			</Label>
			<Info error={error}>{info}</Info>
		</Container>
	);
}

export default Input;
