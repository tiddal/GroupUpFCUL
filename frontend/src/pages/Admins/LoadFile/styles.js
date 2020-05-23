import styled, { css } from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

export const Container = styled(Wrapper)`
	padding-top: 145px;
	height: 100vh;
	@media (min-width: 768px) {
		padding-top: 200px;
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

const dragAcitve = css`
	border-color: ${({ theme }) => theme.colors.success};
`;
const dragReject = css`
	border-color: ${({ theme }) => theme.colors.danger};
`;

export const DropContainer = styled.div.attrs({
	className: 'dropzone',
})`
	border: 1px dashed ${({ theme }) => theme.colors.secondary_text};
	border-radius: 10px;
	cursor: pointer;
	height: 75px;
	width: 100%;
	transition: border-color 0.3s;
	${({ isDragActive }) => isDragActive && dragAcitve};
	${({ isDragReject }) => isDragReject && dragReject};
`;

const messageColors = {
	default: ({ theme }) => theme.colors.secondary_text,
	error: ({ theme }) => theme.colors.danger,
	success: ({ theme }) => theme.colors.success,
	filled: ({ theme }) => theme.colors.text,
};

export const UploadMessage = styled.span`
	display: flex;
	color: ${({ type }) => messageColors[type || 'default']};
	justify-content: center;
	align-items: center;
	height: 100%;
	text-align: center;
	font-size: 14px;
	padding: 0 10px;
	@media (min-width: 768px) {
		font-size: 16px;
	}
`;

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 25px 0;
	height: 40px;
	line-height: 38px;
	font-size: 14px;
	font-weight: 700;
	color: #fff;
	width: 100%;
	border-radius: 10px;
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	background: ${({ theme }) => theme.colors.primary};
	transition: background 0.25s, color 0.25s;
	& > * {
		margin: 0 10px;
	}
	&:disabled {
		color: ${({ theme }) => theme.colors.disabled_text};
		background: ${({ theme }) => theme.colors.disabled_background};
		box-shadow: none;
		cursor: not-allowed;
	}

	@media (min-width: 768px) {
		width: 175px;
	}

	@media (min-width: 1450px) {
		margin: 45px 0;
		&:hover:enabled {
			cursor: pointer;
			background: ${({ theme: { colors } }) => colors.primary_variant};
		}
	}
`;
