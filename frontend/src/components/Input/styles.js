import styled from 'styled-components';

export const Container = styled.div`
	grid-column: ${({ type }) =>
		type === 'number' || type === 'date' || type === 'time'
			? 'unset'
			: '1 / -1'};
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 25px auto 20px;
	align-items: center;

	label {
		font-size: 12px;
		padding: 0 10px;
		transition: color 0.3s ease;
		color: ${({ theme, error }) =>
			error ? theme.colors.danger : theme.colors.text};
		@media (min-width: 768px) {
			font-size: 14px;
		}
	}
	input[type='text'],
	input[type='email'],
	input[type='number'],
	textarea {
		height: 50px;
		background: ${({ theme }) => theme.colors.inputs.background};
		border-radius: 5px;
		padding: 0 20px;
		font-size: 16px;
		transition: border 0.3s ease;
		outline: none;
		color: ${({ theme }) => theme.colors.inputs.text};
		border: 1px solid
			${({ theme, error }) =>
				error ? theme.colors.danger : theme.colors.inputs.border};
		:focus {
			border-color: ${({ theme, error }) =>
				error ? theme.colors.danger : theme.colors.primary_variant};
		}
	}
	textarea {
		font-family: inherit;
		height: 100px;
		padding: 12px 20px 0 20px;
		resize: vertical;
		min-height: 50px;
		max-height: 420px;
	}
`;

export const InputField = styled.input``;

export const Select = styled.div`
	height: 50px;
	width: 100%;
	position: relative;
	background: ${({ theme }) => theme.colors.inputs.background};
	border: 1px solid
		${({ theme, error }) =>
			error ? theme.colors.danger : theme.colors.inputs.border};
	border-radius: 5px;
	transition: border 0.3s ease;
	:focus-within {
		border-color: ${({ theme, error }) =>
			error ? theme.colors.danger : theme.colors.primary_variant};
	}
	input[type='date'],
	input[type='time'],
	input[type='datetime-local'] {
		font-family: inherit;
		position: relative;
		border: none;
		color: ${({ theme }) => theme.colors.inputs.text};
		transition: border-color 0.5s;
		appearance: none;
		border-radius: 5px;
		height: 100%;
		width: 100%;
		background: transparent;
		padding: 0 20px;
		font-size: 16px;
		::-webkit-calendar-picker-indicator {
			cursor: pointer;
			background: transparent;
		}
	}
	select {
		font-family: inherit;
		position: relative;
		border: none;
		color: ${({ theme }) => theme.colors.inputs.text};
		transition: border-color 0.5s;
		appearance: none;
		border-radius: 5px;
		height: 100%;
		width: 100%;
		background: transparent;
		padding: 0 20px;
		font-size: 16px;
		cursor: pointer;
		option {
			font-family: inherit;
			background: ${({ theme }) => theme.colors.surface};
			color: ${({ theme }) => theme.colors.inputs.text};
		}
	}
	span {
		position: absolute;
		height: 100%;
		right: 25px;
		top: 16px;
		z-index: 0;
		svg {
			font-size: 18px;
			color: ${({ theme }) => theme.colors.primary_variant};
		}
	}
`;

export const Info = styled.div`
	align-self: end;
	padding: 0 10px;
	font-size: 11px;
	transition: color 0.5s;
	color: ${({ theme, error }) =>
		error ? theme.colors.danger : theme.colors.secondary_text};
	@media (min-width: 768px) {
		font-size: 12px;
	}
`;
