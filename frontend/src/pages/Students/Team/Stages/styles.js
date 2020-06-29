import styled from 'styled-components';

export const Container = styled.div`
	padding: 30px 20px;
	display: grid;
	grid-template-rows: 40px 40px repeat(3, auto);
	gap: 30px;
	padding-bottom: 20px;
	@media (min-width: 768px) {
		grid-template-rows: 40px repeat(3, auto);
		grid-template-columns: repeat(2, 1fr);
		padding: 30px 50px;
	}
	@media (min-width: 1450px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const ProjectTitle = styled.div`
	color: ${({ theme }) => theme.colors.text};
	font-weight: 700;
	font-size: 20px;
	align-self: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	@media (min-width: 1450px) {
		grid-column: 1 / span 2;
	}
`;

export const Dropdown = styled.div`
	position: relative;
	background: ${({ theme }) => theme.colors.inputs.background};
	border: 1px solid ${({ theme }) => theme.colors.inputs.border};
	border-radius: 5px;
	transition: border 0.3s ease;
	:focus-within {
		border-color: ${({ theme }) => theme.colors.primary_variant};
	}
	@media (min-width: 768px) {
		width: 275px;
		justify-self: end;
	}
	select {
		font-family: inherit;
		position: relative;
		border: none;
		color: ${({ theme }) => theme.colors.inputs.text};
		transition: border-color 0.5s;
		appearance: none;
		border-radius: 5px;
		height: 100%;
		width: 100%;
		background: transparent;
		padding: 0 20px;
		font-size: 16px;
		cursor: pointer;
		option {
			font-family: inherit;
			background: ${({ theme }) => theme.colors.surface};
			color: ${({ theme }) => theme.colors.inputs.text};
		}
	}

	span {
		position: absolute;
		height: 100%;
		right: 12px;
		top: 10px;
		z-index: 0;
		svg {
			font-size: 18px;
			color: ${({ theme }) => theme.colors.primary_variant};
		}
	}
	@media (min-width: 768px) {
		grid-column: 2;
	}
	@media (min-width: 1450px) {
		grid-column: 3;
	}
`;

export const InfoSection = styled.section`
	display: grid;
	grid-template-rows: repeat(2, 25px) auto;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	@media (min-width: 768px) {
		grid-template-rows: 25px auto;
		grid-template-columns: repeat(3, 1fr);
		grid-column: 1 / -1;
	}
	@media (min-width: 1450px) {
		grid-template-columns: repeat(5, 1fr);
	}
`;

export const Badge = styled.div`
	border-radius: 13px;
	padding: 0 13px;
	display: grid;
	grid-template-columns: 14px auto;
	background: ${({ theme, type }) => theme.colors[type]};
	color: #333333;
	font-size: 12px;
	align-items: center;
	justify-items: center;
	font-weight: 600;
`;

export const BadgeLink = styled(Badge).attrs({ as: 'a' })`
	color: #ffffff;
	background: ${({ theme }) => theme.colors.primary};
	cursor: pointer;
	transition: background 0.3s ease;
	span {
		display: flex;
		align-items: center;
		svg {
			font-size: 10px;
			margin-left: 5px;
		}
	}
	:hover {
		background: ${({ theme }) => theme.colors.primary_variant};
	}
`;

export const StageDescription = styled.div`
	grid-column: 1 / -1;
	background: ${({ theme }) => theme.colors.inputs.background};
	border-radius: 5px;
	padding: 13px;
	display: grid;
	grid-template-columns: 14px auto;
	color: ${({ theme }) => theme.colors.text};
	border: 1px solid ${({ theme }) => theme.colors.inputs.border};
	gap: 20px;
	div {
		font-size: 14px;
	}
`;

export const ArtifactsSection = styled.section`
	display: grid;
	grid-template-rows: 20px auto;
	gap: 5px;

	@media (min-width: 768px) {
		grid-column: 1 / -1;
	}
`;

export const SectionTitle = styled.div`
	align-self: center;
	grid-column: 1 / -1;
	font-size: 12px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text};
`;

export const Artifacts = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 75px;
	gap: 20px;
	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (min-width: 1450px) {
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

export const Artifact = styled.div`
	border-radius: 5px;
	background: ${({ type }) => fileTypes[type]};
	display: grid;
	grid-template-columns: auto 30px;
	grid-template-rows: repeat(3, 1fr);
	color: ${({ type }) => fileTypesContrast[type] || '#ffffff'};
	align-items: center;
	justify-items: center;
	a {
		:first-child {
			height: 100%;
			width: 100%;
			grid-row: 1 / span 2;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-left: 30px;
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
			margin-left: 30px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100%;
			text-decoration: none;
		}
	}
	span {
		grid-row: 3;
		align-self: center;
		font-size: 10px;
		font-weight: 600;
	}
	button {
		width: 15px;
		height: 15px;
		padding: 2px;
		background: ${({ type }) => fileTypesContrast[type] || '#ffffff'};
		border-radius: 50%;
		display: flex;
		align-items: center;
		cursor: pointer;
		transition: opacity 0.3s ease;
		color: ${({ type }) => fileTypes[type]};
		svg {
			width: 100%;
			height: 100%;
			margin: 0;
			font-size: 10px;
		}
		div {
			margin-left: 2px;
			width: 7px;
			height: 7px;
			&::after {
				content: '';
				display: block;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				border: 1px solid ${({ type }) => fileTypes[type]};
				border-color: ${({ type }) => fileTypes[type]}
					${({ type }) => fileTypes[type]} transparent transparent;
				animation: lds-dual-ring 1.2s linear infinite;
			}
			@keyframes lds-dual-ring {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		}
		:disabled {
			cursor: not-allowed;
		}
		@media (min-width: 1450px) {
			opacity: 0.65;
			:hover:enabled {
				opacity: 1;
			}
		}
	}
`;

export const LoadArtifact = styled(Artifact).attrs({ as: 'div' })`
	background: ${({ theme }) => theme.colors.inputs.background};
	color: ${({ theme }) => theme.colors.text};
	grid-template-columns: auto;
	border: 1px dashed ${({ theme }) => theme.colors.inputs.border};
	cursor: pointer;
	div {
		grid-row: 1 / span 2;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		svg {
			font-size: 32px;
		}
	}

	svg,
	span {
		transition: color 0.3s ease;
		${({ isDragReject, theme }) =>
			isDragReject && `color: ${theme.colors.danger};`}
		${({ isDragAccept, theme }) =>
			isDragAccept && `color: ${theme.colors.success};`}
	}

	span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
		padding: 0 10px;
	}
`;

export const LoadingArtifcat = styled(LoadArtifact)`
	border: none;
	cursor: not-allowed;
	background: ${({ type }) => fileTypes[type]};
	span {
		color: ${({ type }) => fileTypesContrast[type] || '#ffffff'};
	}
	div {
		display: inline-block;
		&::after {
			content: '';
			display: block;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			border: 2px solid ${({ type }) => fileTypesContrast[type] || '#ffffff'};
			border-color: ${({ type }) => fileTypesContrast[type] || '#ffffff'}
				${({ type }) => fileTypesContrast[type] || '#ffffff'} transparent
				transparent;
			animation: lds-dual-ring 1.2s linear infinite;
		}
		@keyframes lds-dual-ring {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
`;

export const EvaluationSection = styled.section`
	display: grid;
	grid-template-rows: 20px auto;
	gap: 5px;
	@media (min-width: 768px) {
		grid-column: 1 / -1;
	}
`;

export const Feedback = styled.div`
	background: ${({ theme }) => theme.colors.inputs.background};
	border-radius: 5px;
	padding: 13px;
	display: grid;
	grid-template-rows: auto 40px;
	color: ${({ theme }) => theme.colors.text};
	border: 1px solid ${({ theme }) => theme.colors.inputs.border};
	gap: 20px;
	div {
		font-size: 14px;
	}
	span {
		font-size: 24px;
		align-self: end;
		justify-self: end;
	}
`;
