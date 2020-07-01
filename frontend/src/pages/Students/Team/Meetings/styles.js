import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	grid-auto-rows: min-content;
	padding: 50px 20px;
	background: ${({ theme }) => theme.colors.surface};
	gap: 30px;
	@media (min-width: 768px) {
		padding: 50px;
	}
`;

export const Card = styled.div`
	display: grid;
	grid-template-rows: 90px;
	grid-auto-rows: min-content;
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
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: min-content;
			column-gap: 30px;
		}
	}
`;

export const Title = styled.div`
	grid-column: 1 / -1;
	display: grid;
	grid-template-columns: 25px auto 60px;
	align-items: center;
	color: ${({ theme }) => theme.colors.text};
	svg {
		color: ${({ theme, type }) => theme.colors[type || 'text']};
		font-size: 16px;
	}

	span {
		font-size: 18px;
		white-space: nowrap;
		font-weight: 700;
		overflow: hidden;
		max-width: 100%;
		text-overflow: ellipsis;
		color: ${({ theme }) => theme.colors.text};
		@media (min-width: 768px) {
			font-size: 20px;
		}
	}
	div {
		width: 60px;
		display: flex;
		justify-content: space-around;
		button {
			cursor: pointer;
			svg {
				color: ${({ theme }) => theme.colors.primary_variant};
				font-size: 18px;
				transition: color 0.3s ease;
			}
			&:hover {
				color: ${({ theme }) => theme.colors.primary};
			}
			:last-child svg {
				color: ${({ theme }) => theme.colors.danger};

				&:hover {
					color: ${({ theme }) => theme.colors.hover.danger};
				}
			}
		}
	}
`;

export const NewMeetingTitle = styled(Title)`
	div {
		justify-content: flex-end;
		button svg {
			color: ${({ theme }) => theme.colors.danger};
			&:hover {
				color: ${({ theme }) => theme.colors.hover.danger};
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
		span,
		img {
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
	&:hover:enabled {
		background: ${({ theme }) => theme.colors.primary_variant};
	}
	& > * {
		margin: 0 10px;
	}
	@media (min-width: 768px) {
		width: 50%;
		justify-self: end;
		grid-column: 2;
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
