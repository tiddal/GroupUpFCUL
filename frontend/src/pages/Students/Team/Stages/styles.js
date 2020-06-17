import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
	padding: 30px 20px;
	display: grid;
	grid-template-rows: 40px repeat(3, auto);
	gap: 30px;
	padding-bottom: 20px;
	@media (min-width: 768px) {
		padding: 30px 50px;
	}
	@media (min-width: 1450px) {
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
`;

export const InfoSection = styled.section`
	display: grid;
	grid-template-rows: repeat(2, 25px) auto;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	@media (min-width: 768px) {
		grid-template-rows: 25px auto;
		grid-template-columns: repeat(3, 1fr);
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

export const BadgeLink = styled(Badge).attrs({ as: NavLink })`
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
		font-size: 12px;
	}
`;

export const ArtifactsSection = styled.section`
	display: grid;
	grid-template-rows: 20px auto;
	gap: 5px;
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

export const Artifact = styled.div`
	border-radius: 5px;
	background: #ff0909;
	display: grid;
	grid-template-columns: auto 30px;
	grid-template-rows: auto 20px;
	color: #ffffff;
	align-items: center;
	justify-items: center;
	svg {
		font-size: 32px;
		margin-left: 30px;
	}
	span {
		align-self: start;
		font-size: 10px;
		font-weight: 600;
		margin-left: 30px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}
	button {
		margin-top: 7px;
		width: 15px;
		height: 15px;
		padding: 2px;
		background: #ffffff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		cursor: pointer;
		align-self: start;
		transition: opacity 0.3s ease;
		svg {
			color: #ff0909;
			width: 100%;
			height: 100%;
			margin: 0;
			font-size: 10px;
		}
		@media (min-width: 1450px) {
			opacity: 0.65;
			:hover {
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

	svg,
	span {
		margin: 0;
	}
`;

export const EvaluationSection = styled.section`
	display: grid;
	grid-template-rows: 20px auto;
	gap: 5px;
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
		font-size: 12px;
	}
	span {
		font-size: 24px;
		align-self: end;
		justify-self: end;
	}
`;
