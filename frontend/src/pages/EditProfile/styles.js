import styled from 'styled-components';
import { Wrapper } from '../../components/Wrapper';

export const Container = styled(Wrapper)`
	padding-top: 145px;
	height: 100vh;
	@media (min-width: 768px) {
		padding-top: 200px;
		padding-bottom: 100px;
		height: auto;
		display: flex;
		justify-content: center;
	}
`;

export const Sheet = styled.div`
	background: ${({ theme }) => theme.colors.background};
	border-radius: 20px 20px 0 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: ${({ theme }) => theme.box_shadow.primary};
	padding: 20px;

	@media (min-width: 768px) {
		padding: 30px 40px;
		width: 660px;
		border-radius: 10px;
	}
	@media (min-width: 1450px) {
		width: 960px;
		padding-bottom: 60px;
	}
`;

export const Title = styled.div`
	color: ${({ theme: { colors } }) => colors.text};
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 0;
	span {
		font-size: 18px;
		text-transform: capitalize;
		font-weight: 700;
		svg {
			font-size: 16px;
			margin-right: 15px;
		}
	}

	@media (min-width: 768px) {
		& > span {
			font-size: 20px;
		}
		& > svg {
			font-size: 16px;
		}
	}
`;

export const Form = styled.form`
	margin-top: 40px;
	width: 300px;
	display: grid;
	gap: 10px;
	grid-template-rows: 150px auto;
	@media (min-width: 768px) {
		column-gap: 25px;
		width: 525px;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1450px) {
		column-gap: 25px;
		width: 760px;
	}
`;

export const Picture = styled.div`
	display: grid;
	img {
		width: 125px;
		height: 125px;
		border-radius: 50%;
		justify-self: center;
	}
	span {
		justify-self: center;
		width: 125px;
		height: 125px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background: orange;
		color: #ffffff;
		font-size: 48px;
		font-weight: 700;
		box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	}
	@media (min-width: 768px) {
		grid-column: 1 / -1;
	}
`;

export const DropzoneContainer = styled.div`
	grid-column: 1 / -1;
	display: grid;
	grid-template-rows: 25px auto;
	align-items: center;
	margin-bottom: 10px;
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
`;

export const Button = styled.button`
	margin-top: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	font-size: 14px;
	font-weight: 700;
	color: #fff;
	border-radius: 5px;
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	background: ${({ theme }) => theme.colors.success};
	transition: background 0.3s, color 0.3s;
	cursor: pointer;

	&:disabled {
		color: ${({ theme }) => theme.colors.disabled_text};
		background: ${({ theme }) => theme.colors.disabled_background};
		box-shadow: none;
		cursor: not-allowed;
	}

	&:hover:enabled {
		background: ${({ theme }) => theme.colors.hover.success};
	}

	@media (min-width: 768px) {
		width: 100%;
		grid-column: 2;
	}
`;

export const Separator = styled.div`
	margin: 30px 0;
	grid-column: 1 / -1;
	display: flex;
	div {
		width: 100%;
		height: 1px;
		background: ${({ theme }) => theme.colors.disabled_background};
		display: flex;
		justify-content: center;
		align-items: center;
		@media (min-width: 768px) {
			justify-content: flex-start;
		}
		span {
			background: ${({ theme }) => theme.colors.background};
			color: ${({ theme }) => theme.colors.secondary_text};
			border: 1px solid ${({ theme }) => theme.colors.disabled_background};
			border-radius: 15px;
			font-weight: 700;
			font-size: 10px;
			text-transform: uppercase;
			padding: 3px 30px;
			@media (min-width: 768px) {
				margin-left: 10%;
			}
		}
	}
`;
