import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 60px auto;
	padding: 50px 20px;
	background: ${({ theme }) => theme.colors.surface};
	grid-auto-rows: min-content;
	gap: 30px;
	@media (min-width: 768px) {
		padding: 50px;
	}
`;

export const Card = styled.div`
	display: grid;
	grid-template-rows: 90px auto;
	grid-column: 1 / -1;
	background: ${({ theme }) => theme.colors.background};
	border-radius: 10px;
	box-shadow: ${({ theme }) => theme.box_shadow.primary};
	padding: 0 30px;
	padding-bottom: 30px;
	form {
		display: grid;
		grid-column: 1 / -1;
	}
	@media (min-width: 768px) {
		box-shadow: none;
		padding-bottom: 40px;
		form {
			grid-column: 1 / -1;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 30px;
		}
	}
`;

export const Title = styled.div`
	grid-column: 1 / -1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${({ theme }) => theme.colors.text};
	span {
		display: flex;
		align-items: center;
		font-size: 20px;
		font-weight: 700;
		text-transform: uppercase;
		svg {
			width: 16px;
			margin-right: 10px;
		}
	}
	div {
		width: 75px;
		display: flex;
		justify-content: space-around;
		button {
			transition: color 0.3s ease;
			cursor: pointer;
			font-size: 18px;
			color: ${({ theme }) => theme.colors.primary_variant};
			&:hover {
				color: ${({ theme }) => theme.colors.primary};
			}
			:last-child {
				color: ${({ theme }) => theme.colors.danger};
				&:hover {
					color: ${({ theme }) => theme.colors.hover.danger};
				}
			}
		}
	}
`;

export const ParticipantsSection = styled.div`
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 25px 50px;
	align-items: center;
	div {
		font-size: 12px;
		padding: 0 10px;
		color: ${({ theme }) => theme.colors.text};
		display: flex;
		@media (min-width: 768px) {
			font-size: 14px;
		}

		@media (min-width: 1450px) {
		}
		span {
			width: 40px;
			height: 40px;
			background: orange;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 40px;
			font-size: 18px;
			font-weight: 700;
			color: #ffffff;
			box-shadow: ${({ theme }) => theme.box_shadow.secondary};
			&:not(:first-child) {
				margin-left: -15px;
			}
		}
	}
`;

export const Button = styled.button`
	height: 40px;
	margin-top: 40px;
	background: ${({ theme }) => theme.colors.primary};
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
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
	&:hover {
		background: ${({ theme }) => theme.colors.primary_variant};
	}
	& > * {
		margin: 0 10px;
	}
	@media (min-width: 768px) {
		width: 50%;
		justify-self: end;
	}
`;

export const MainButton = styled.button`
	height: 40px;
	grid-column: 1 / -1;
	display: flex;
	cursor: pointer;
	background: ${({ theme }) => theme.colors.success};
	text-decoration: none;
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	justify-content: center;
	align-items: center;
	transition: background 0.3s ease;
	border-radius: 5px;
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};

	svg {
		margin-right: 15px;
		font-size: 12px;
		margin-top: 2px;
	}
	&:hover {
		background: ${({ theme }) => theme.colors.hover.success};
	}

	@media (min-width: 768px) {
		grid-column: 3;
	}
`;
