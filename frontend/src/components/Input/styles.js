import styled from 'styled-components';

export const Container = styled.div`
	grid-column: ${({ type }) =>
		type === 'number' || type === 'datetime-local' ? 'unset' : '1 / -1'};
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: auto 20px;
`;

export const Fieldset = styled.fieldset`
	padding: 0;
	line-height: 0;
	border: 1px solid
		${({ theme, error }) =>
			error ? theme.colors.danger : theme.colors.secondary_text};
	border-radius: 5px;
	color: ${({ theme, error }) =>
		error ? theme.colors.danger : theme.colors.secondary_text};
	legend {
		font-size: 12px;
		font-weight: 600;
		margin-left: 10px;
		padding: 0 10px;
	}
	input[type='datetime-local']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		display: none;
	}
`;

export const InputField = styled.input`
	height: 50px;
	background: transparent;
	width: 100%;
	padding: 0 20px;
	border: none;
	color: ${({ theme }) => theme.colors.text};
	transition: border-color 0.5s;
	font-size: 16px;
`;

export const Textarea = styled(InputField).attrs({ as: 'textarea' })`
	padding-top: 20px;
	resize: vertical;
	min-height: 50px;
	height: 100px;
	max-height: 500px;
`;

export const Select = styled.div`
	height: 50px;
	width: 100%;
	position: relative;
	select {
		position: relative;
		border: none;
		background: ${({ theme }) => theme.colors.background};
		transition: border-color 0.5s;
		appearance: none;
		border-radius: 5px;
		height: 100%;
		width: 100%;
		background: transparent;
		padding: 0 20px;
		color: ${({ theme }) => theme.colors.text};
		font-size: 16px;
		cursor: pointer;
		option {
			background: ${({ theme }) => theme.colors.background};
			color: ${({ theme }) => theme.colors.text};
		}
	}
	span {
		position: absolute;
		height: 100%;
		right: 15px;
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
	font-size: 12px;
	transition: color 0.5s;
	color: ${({ theme, error }) =>
		error ? theme.colors.danger : theme.colors.secondary_text};
`;
