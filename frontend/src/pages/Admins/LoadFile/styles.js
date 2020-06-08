import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

export const Container = styled(Wrapper)`
	padding-top: 145px;
	height: 100vh;
	@media (min-width: 768px) {
		padding-top: 200px;
		height: auto;
		display: flex;
		justify-content: center;
		padding-bottom: 100px;
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
		padding: 30px 40px 0 40px;
		width: 660px;
		border-radius: 10px;
		box-shadow: ${({ theme }) => theme.box_shadow.primary};
		overflow: hidden;
	}
	@media (min-width: 1450px) {
		width: 960px;
		padding: 30px 40px 0 40px;
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

export const UploadSection = styled.form`
	display: flex;
	justify-content: center;
	align-content: center;
	padding-top: 40px;
	flex-wrap: wrap;
	width: 300px;
	label {
		width: 100%;
		color: ${({ theme }) => theme.colors.secondary_text};
		font-size: 10px;
		margin-top: 5px;
		padding-left: 15px;
	}

	@media (min-width: 768px) {
		width: 550px;
		label {
			font-size: 12px;
		}
	}

	@media (min-width: 1450px) {
		width: 760px;
	}
`;

export const InfoSection = styled.div`
	display: flex;
	width: 300px;
	background: ${({ theme }) => theme.colors.surface};
	margin-top: 25px;
	padding: 20px;
	border-radius: 10px;
	color: ${({ theme }) => theme.colors.text};
	span {
		font-size: 14px;
	}
	div {
		font-size: 10px;
		margin-left: 15px;
		ul {
			margin-top: 10px;
			list-style-type: none;
		}
	}
	@media (min-width: 768px) {
		width: 660px;
		border-radius: 0;
		padding: 40px;
		span {
			font-size: 18px;
		}
		div {
			font-size: 12px;
		}
	}

	@media (min-width: 1450px) {
		width: 960px;
		border-radius: 0;
		padding: 40px;

		div {
			font-size: 14px;
		}
	}
`;

const messageColors = {
	default: ({ theme }) => theme.colors.secondary_text,
	error: ({ theme }) => theme.colors.danger,
	success: ({ theme }) => theme.colors.success,
	filled: ({ theme }) => theme.colors.text,
};

export const NotificationSection = styled(InfoSection)`
	background: ${({ theme }) => theme.colors.background};
	margin-top: 0;
	border: 1px solid ${({ type }) => messageColors[type]};
	span {
		color: ${({ type }) => messageColors[type]};
	}
	@media (min-width: 768px) {
		width: 550px;
		border: none;
		padding: 0 0 20px 0;
		div {
			padding-top: 2px;
		}
	}
	@media (min-width: 1450px) {
		width: 760px;
	}
`;
