import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

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
	border-radius: 20px 20px 0 0;
	background: ${({ theme }) => theme.colors.background};
	height: auto;
	min-height: 100%;
	box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (min-width: 768px) {
		padding: 30px 40px 10px 40px;
		width: 660px;
		border-radius: 10px;
		box-shadow: ${({ theme }) => theme.box_shadow.primary};
	}
	@media (min-width: 1450px) {
		width: 960px;
		padding: 30px 40px 20px 40px;
	}
`;

export const Title = styled.div`
	color: ${({ theme: { colors } }) => colors.text};
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 0;
	& > span {
		font-size: 18px;
		text-transform: uppercase;
		font-weight: 700;
	}
	& > svg {
		font-size: 16px;
		margin-right: 15px;
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
	@media (min-width: 768px) {
		width: 525px;
	}
	@media (min-width: 1450px) {
		width: 760px;
	}
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 50px 0;
	height: 40px;
	font-size: 14px;
	font-weight: 700;
	color: #fff;
	width: 100%;
	border-radius: 5px;
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	background: ${({ theme }) => theme.colors.success};
	transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;
	&:disabled {
		color: ${({ theme }) => theme.colors.disabled_text};
		background: ${({ theme }) => theme.colors.disabled_background};
		box-shadow: none;
		cursor: not-allowed;
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
