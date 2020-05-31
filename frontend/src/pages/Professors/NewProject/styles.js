import styled, { css } from 'styled-components';
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
		padding: 30px 40px 40px 40px;
		width: 660px;
		border-radius: 10px;
		box-shadow: ${({ theme }) => theme.box_shadow.primary};
	}
	@media (min-width: 1450px) {
		width: 960px;
		padding: 30px 40px 60px 40px;
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
	gap: 25px;
	@media (min-width: 768px) {
		width: 525px;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1450px) {
		width: 760px;
	}
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	margin: 10px 0;
	height: 40px;
	line-height: 38px;
	font-size: 14px;
	font-weight: 700;
	color: #fff;
	width: 100%;
	border-radius: 10px;
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	background: ${({ theme }) => theme.colors.primary};
	justify-self: center;
	transition: background 0.25s, color 0.25s;
	&:disabled {
		color: ${({ theme }) => theme.colors.disabled_text};
		background: ${({ theme }) => theme.colors.disabled_background};
		box-shadow: none;
		cursor: not-allowed;
	}

	@media (min-width: 768px) {
		width: 115px;
		justify-self: end;
		grid-column: 2;
	}

	@media (min-width: 1450px) {
		&:hover:enabled {
			cursor: pointer;
			background: ${({ theme: { colors } }) => colors.primary_variant};
		}
	}
`;

// DropZone

const dragAcitve = css`
	border-color: ${({ theme }) => theme.colors.success};
	color: ${({ theme }) => theme.colors.success};
`;
const dragReject = css`
	border-color: ${({ theme }) => theme.colors.danger};
	color: ${({ theme }) => theme.colors.danger};
`;

export const DropzoneContainer = styled.div`
	display: grid;
	grid-column: 1/-1;
	grid-template-columns: 100%;
	grid-template-rows: auto 20px;
	label {
		align-self: end;
		padding: 0 10px;
		font-size: 12px;
		transition: color 0.5s;
		color: ${({ theme }) => theme.colors.secondary_text};
	}
`;

export const DropzoneFieldset = styled.fieldset.attrs({
	className: 'dropzone',
})`
	padding: 0;
	line-height: 0;
	border: 1px dashed ${({ theme }) => theme.colors.secondary_text};
	border-radius: 5px;
	color: ${({ theme, error }) =>
		error ? theme.colors.danger : theme.colors.secondary_text};
	${({ isDragActive }) => isDragActive && dragAcitve};
	${({ isDragReject }) => isDragReject && dragReject};
	transition: color 0.3s, border-color 0.3s;
	legend {
		font-size: 12px;
		font-weight: 600;
		margin-left: 10px;
		padding: 0 10px;
	}
`;

export const DropzoneInput = styled.div`
	display: flex;
	border-radius: 10px;
	cursor: pointer;
	height: 100px;
	width: 100%;
	padding: 10px;
	align-items: center;
	justify-content: center;
	transition: border-color 0.3s;
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
	text-align: center;
	font-size: 14px;
	line-height: normal;
	@media (min-width: 768px) {
		font-size: 16px;
	}
`;

export const Separator = styled.div`
	margin: 30px 0;
	grid-column: 1 / -1;
	width: 100%;
	height: 1px;
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

export const StageSection = styled.div`
	grid-column: 1 / -1;
	display: grid;
	gap: 25px;
	grid-template-columns: 100%;
	justify-items: center;
`;

export const StageInputs = styled.div`
	display: grid;
	margin-top: 20px;
	width: 660px;
	grid-template-columns: repeat(2, 1fr);
	gap: 25px;
`;

export const StageTitle = styled(Title)``;
