import React from 'react';

import { Container, InputField, Info, Select } from './styles';
import { FaAngleDown, FaCalendarDay, FaClock } from 'react-icons/fa';

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
	disabled,
}) {
	const inputs = {
		text: (
			<InputField
				type={type}
				id={id}
				onChange={change}
				value={value}
				disabled={disabled}
			/>
		),
		number: (
			<InputField
				type={type}
				id={id}
				onChange={change}
				value={value}
				disabled={disabled}
			/>
		),

		date: (
			<Select>
				<span>
					<FaCalendarDay />
				</span>
				<InputField
					type={type}
					id={id}
					onChange={change}
					value={value}
					disabled={disabled}
				/>
			</Select>
		),
		time: (
			<Select>
				<span>
					<FaClock />
				</span>
				<InputField
					type={type}
					id={id}
					onChange={change}
					value={value}
					disabled={disabled}
				/>
			</Select>
		),
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
		textarea: (
			<textarea
				id={id}
				onChange={change}
				value={value}
				disabled={disabled}
			></textarea>
		),
		'datetime-local': (
			<Select>
				<span>
					<FaCalendarDay />
				</span>
				<InputField type={type} id={id} onChange={change} value={value} />
			</Select>
		),
	};
	return (
		<Container type={type} error={error}>
			<label htmlFor={id}>
				{label}:{validation.required && ' *'}
			</label>
			{inputs[type]}
			<Info error={error}>{info}</Info>
		</Container>
	);
}

export default Input;
