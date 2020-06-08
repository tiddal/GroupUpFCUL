import styled, { css } from 'styled-components';

const dragAcitve = css`
	border-color: ${({ theme }) => theme.colors.success};
`;
const dragReject = css`
	border-color: ${({ theme }) => theme.colors.danger};
`;

const messageColors = {
	default: ({ theme }) => theme.colors.text,
	error: ({ theme }) => theme.colors.danger,
	success: ({ theme }) => theme.colors.success,
	filled: ({ theme }) => theme.colors.text,
};

export const Container = styled.div`
	height: 100px;
	width: 100%;
	label {
		font-size: 12px;
		padding: 0 10px;
		transition: color 0.3s ease;
		color: ${({ theme, error }) =>
			error ? theme.colors.danger : theme.colors.text};
	}
`;

export const Zone = styled.div.attrs({
	className: 'dropzone',
})`
	border: 1px dashed ${({ theme }) => theme.colors.inputs.border};
	border-radius: 5px;
	cursor: pointer;
	height: 75px;
	width: 100%;
	transition: border-color 0.3s;
	${({ isDragActive }) => isDragActive && dragAcitve};
	${({ isDragReject }) => isDragReject && dragReject};
	background: ${({ theme }) => theme.colors.inputs.background};
`;

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
