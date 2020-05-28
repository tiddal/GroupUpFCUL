import React from 'react';

import { Container, InputField, Label, Info, Select } from './styles';
import { FaAngleDown } from 'react-icons/fa';

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
	options,
}) {
	const inputs = {
		text: <InputField type={type} id={id} onChange={change} value={value} />,
		select: options && (
			<Select>
				<span>
					<FaAngleDown />
				</span>
				<select id={id} onChange={change} danger={danger} value={value}>
					{options.map((option) => (
						<option
							key={`option${option.value}${option.text}${id}`}
							value={option.value}
						>
							{option.text}
						</option>
					))}
				</select>
			</Select>
		),
	};
	return (
		<Container error={error} danger={danger}>
			{inputs[type]}
			<Label htmlFor={id}>
				{label}:{validation.required && ' (*)'}
			</Label>
			<Info error={error}>{info}</Info>
		</Container>
	);
}

export default Input;
