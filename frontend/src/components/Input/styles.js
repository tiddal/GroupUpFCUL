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
	position: relative;
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

export const Select = styled.div`
	height: 50px;
	width: 100%;
	border-color: inherit;
	position: relative;
	select {
		position: relative;
		border: 1px solid;
		border-color: inherit;
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
		&:focus {
			border-color: ${({ theme, danger }) =>
				danger ? theme.colors.danger : theme.colors.primary_variant};
		}
		&:active {
			border-color: ${({ theme, danger }) =>
				danger ? theme.colors.danger : theme.colors.primary_variant};
		}

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
	height: 15px;
	font-size: 12px;
	transition: color 0.5s;
	color: ${({ theme, error }) =>
		error ? theme.colors.danger : theme.colors.secondary_text};
	margin-top: 2px;
	width: 100%;
	padding-left: 10px;
`;
