import styled from 'styled-components';

export const ButtonContainer = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	font-weight: 700;
	color: #fff;
	border-radius: 5px;
	transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;
	&:disabled {
		color: ${({ theme }) => theme.colors.disabled_text};
		background: ${({ theme }) => theme.colors.disabled_background};
		box-shadow: none;
		cursor: not-allowed;
	}
`;

export const SubmitButton = styled(ButtonContainer)`
	margin: 50px 0;
	height: 40px;
	width: 100%;
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	background: ${({ theme }) => theme.colors.success};
	&:hover {
		background: ${({ theme }) => theme.colors.hover.success};
	}
	& > * {
		margin: 0 10px;
	}
	@media (min-width: 768px) {
		margin-top: 15px;
		width: 150px;
		justify-self: end;
	}

	@media (min-width: 1450px) {
		width: 175px;
		justify-self: end;
	}
`;

export const DangerButtonContainer = styled(ButtonContainer)`
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	background: ${({ theme }) => theme.colors.danger};
	height: 40px;
	&:hover {
		background: ${({ theme }) => theme.colors.hover.danger};
	}
`;
