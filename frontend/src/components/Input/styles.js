import styled from 'styled-components';

export const Container = styled.div`
	margin-top: 10px;
	display: flex;
	height: 70px;
	flex-wrap: wrap;
	width: 100%;
	color: ${({ theme, error }) =>
		error ? theme.colors.danger : theme.colors.secondary_text};
	&:focus-within label {
		color: ${({ theme, error, danger }) =>
			error || danger ? theme.colors.danger : theme.colors.primary_variant};
	}
	&:focus-within input {
		border-color: ${({ theme, error, danger }) =>
			error || danger ? theme.colors.danger : theme.colors.primary_variant};
	}
	border-color: ${({ theme, error }) =>
		error ? theme.colors.danger : theme.colors.secondary_text};
`;

export const Label = styled.label`
	font-size: 12px;
	margin-left: 10px;
	height: 20px;
	background: ${({ theme }) => theme.colors.background};
	width: auto;
	padding: 0 5px;
	display: flex;
	transition: color 0.5s;
	margin-top: -60px;
	line-height: 18px;
`;

export const InputField = styled.input`
	height: 50px;
	width: 100%;
	padding: 0 20px;
	border: 1px solid;
	border-color: inherit;
	background: ${({ theme }) => theme.colors.background};
	border-radius: 5px;
	color: ${({ theme }) => theme.colors.text};
	transition: border-color 0.5s;
	font-size: 16px;
`;

export const Info = styled.div`
	height: 15px;
	font-size: 12px;
	transition: color 0.5s;
	color: ${({ theme, error }) =>
		error ? theme.colors.danger : theme.colors.secondary_text};
	margin-top: 2px;
	width: 100%;
	padding-left: 10px;
`;
