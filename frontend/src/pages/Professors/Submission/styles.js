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
	background: ${({ theme }) => theme.colors.background};
	border-radius: 20px 20px 0 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: ${({ theme }) => theme.box_shadow.primary};
	padding: 20px;
	padding-bottom: 50px;

	@media (min-width: 768px) {
		padding: 30px 40px;
		width: 660px;
		border-radius: 10px;
		padding-bottom: 50px;
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
		text-transform: uppercase;
		font-weight: 700;
		span {
			color: ${({ theme: { colors } }) => colors.inputs.placeholder};
			text-transform: none;
			font-weight: 500;
		}
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
	width: 300px;
	display: grid;
	gap: 10px;
	@media (min-width: 768px) {
		column-gap: 25px;
		width: 525px;
		grid-template-columns: repeat(3, 1fr);
		div {
			:last-of-type {
				grid-column: unset;
			}
		}
	}
	@media (min-width: 1450px) {
		column-gap: 25px;
		width: 760px;
	}
`;

export const Button = styled.button`
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
		width: 200px;
		grid-column: 1/-1;
		align-self: center;
		justify-self: end;
	}
`;

export const Artifacts = styled.div`
	width: 300px;
	margin-top: 40px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 20px;
	grid-auto-rows: 70px;
	gap: 10px 20px;
	span {
		grid-column: 1 / -1;
		padding: 0 10px;
		font-size: 12px;

		color: ${({ theme }) => theme.colors.text};
		align-self: end;
		@media (min-width: 768px) {
			font-size: 14px;
		}
	}
	@media (min-width: 768px) {
		width: 525px;
		grid-template-columns: repeat(3, 1fr);
	}
	@media (min-width: 1450px) {
		width: 760px;
		grid-template-columns: repeat(5, 1fr);
	}
`;

const fileTypes = {
	csv: '#31c582',
	doc: '#2160c3',
	docx: '#2160c3',
	pdf: '#ff0909',
	ppt: '#ee6c45',
	pptx: '#ee6c45',
	txt: '#7618a9',
	xls: '#1c8143',
	xlsx: '#1c8143',
	zip: '#fde695',
	'7z': '#fde695',
	rar: '#fde695',
};

const fileTypesContrast = {
	zip: '#333333',
	'7z': '#333333',
	rar: '#333333',
};

export const Artifact = styled.a`
	border-radius: 5px;
	background: ${({ type }) => fileTypes[type]};
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	color: ${({ type }) => fileTypesContrast[type] || '#ffffff'};
	align-items: center;
	justify-items: center;
	span {
		:first-child {
			height: 100%;
			width: 100%;
			grid-row: 1 / span 2;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 10px;
			color: inherit;
			svg {
				font-size: 32px;
			}
		}
		:last-child {
			color: inherit;
			grid-row: 3;
			align-self: center;
			font-size: 10px;
			font-weight: 700;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100%;
			text-decoration: none;
		}
	}
`;

export const Separator = styled.div`
	width: 300px;
	margin: 125px 0 50px 0;
	grid-column: 1 / -1;
	display: flex;
	@media (min-width: 768px) {
		width: 525px;
		margin: 75px 0 35px 0;
	}
	@media (min-width: 1450px) {
		margin: 100px 0 50px 0;
		width: 760px;
	}
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
