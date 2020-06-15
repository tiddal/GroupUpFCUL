import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';
import { NavLink } from 'react-router-dom';

export const Container = styled(Wrapper)`
	padding-top: 150px;
	padding-bottom: 45px;
	display: grid;
	grid-template-columns: 285px;
	grid-template-rows: auto;
	justify-content: center;
	gap: 30px;
	@media (min-width: 768px) {
		margin: 0;
		padding-top: 200px;
		grid-template-columns: repeat(3, 220px);
		align-content: center;
		gap: 40px 0;
	}
	@media (min-width: 1450px) {
		grid-template-columns: repeat(3, 320px);
	}
`;

export const Card = styled.div`
	grid-column: 1 / -1;
	background: ${({ theme }) => theme.colors.background};
	border-radius: 10px;
	box-shadow: ${({ theme }) => theme.box_shadow.primary};
	display: grid;
	grid-template-columns: 100%;
	overflow: hidden;
	${({ expand, members }) => {
		const height = 270 + 50 * members + 20 * (members - 1);
		if (expand) return `height: ${height}px;`;
		return `height: 75px;`;
	}}
	transition: height 0.3s ease-in;
	grid-template-rows: 75px auto;
	@media (min-width: 768px) {
		grid-template-rows: 80px auto;
		${({ expand, members }) => {
			const height =
				265 + 50 * Math.ceil(members / 2) + 20 * (Math.ceil(members / 2) - 1);
			if (expand) return `height: ${height}px;`;
			return `height: 80px;`;
		}}
	}
`;

export const Title = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 25px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.text};
	font-weight: 700;
	text-transform: uppercase;
	cursor: pointer;
	span {
		height: 25px;
		display: flex;
		align-items: center;
		svg {
			font-size: 12px;
			margin-right: 15px;
		}
	}
	@media (min-width: 768px) {
		padding: 0 35px;
		font-size: 20px;
		span {
			height: 35px;
			svg {
				font-size: 16px;
				margin-top: 3px;
			}
		}
	}
`;

export const ExpandButton = styled.div`
	width: 25px;
	height: 25px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background 0.3s;
	cursor: pointer;
	svg {
		font-size: 16px;
		color: ${({ theme }) => theme.colors.primary_variant};
		transition: transform 0.3s;
		transform: ${({ expand }) => (expand ? 'rotateZ(180deg)' : 'none')};
	}
	&:hover {
		background: ${({ theme }) => theme.colors.surface};
	}
	@media (min-width: 768px) {
		width: 35px;
		height: 35px;
		svg {
			font-size: 20px;
		}
	}
`;

export const Content = styled.div`
	border-top: 2px solid ${({ theme }) => theme.colors.surface};
	padding: 25px 25px 40px 25px;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: auto 40px;
	gap: 40px;
	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		padding: 25px 60px 40px 60px;
	}
`;

export const MembersSection = styled.div`
	grid-column: 1 / -1;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 20px 50px;
	grid-auto-rows: 50px;
	align-items: center;
	gap: 20px;
	span {
		font-size: 14px;
		grid-column: 1 / -1;
		color: ${({ theme }) => theme.colors.secondary_text};
		font-weight: 600;
	}
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const Member = styled.div`
	display: grid;
	grid-template-columns: 50px auto;
	grid-template-rows: 100%;
	span {
		grid-column: unset;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50px;
		background: orange;
		color: #ffffff;
		font-size: 24px;
		font-weight: 700;
		box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	}
	img {
		width: 50px;
		height: 50px;
		border-radius: 50px;
	}
	div {
		padding: 0 15px;
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: 100%;
		align-items: center;
		p {
			:first-child {
				font-weight: 700;
			}
			:nth-child(2) {
				font-size: 10px;
				color: ${({ theme }) => theme.colors.secondary_text};
				font-weight: 600;
			}
			color: ${({ theme }) => theme.colors.text};
			font-size: 12px;
			svg {
				color: #f2b01e;
			}
		}
	}
`;

export const Info = styled.div`
	grid-column: 1 / -1;
	background: ${({ theme }) => theme.colors.surface};
	padding: 15px;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 25px auto;
	color: ${({ theme }) => theme.colors.text};
	overflow: hidden;
	p {
		display: grid;
		padding: 10px 0;
		font-size: 12px;
		a {
			display: flex;
			align-items: center;
			color: ${({ theme }) => theme.colors.primary_variant};
			svg {
				margin-left: 5px;
				width: 9px;
			}
		}
		@media (min-width: 768px) {
			font-size: 14px;
			padding: 10px 45px;
		}
	}
	@media (min-width: 768px) {
		padding: 15px 30px;
	}
`;

export const InfoTitle = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
	font-weight: 600;
	svg {
		font-size: 16px;
		margin-right: 15px;
	}
	@media (min-width: 768px) {
		font-size: 16px;
	}
`;

export const Button = styled.button`
	cursor: pointer;
	grid-column: 1 / -1;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ theme, type }) => theme.colors[type || 'primary']};
	border-radius: 5px;
	text-decoration: none;
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	transition: background 0.3s ease;
	svg {
		margin-right: 15px;
		font-size: 12px;
		margin-top: 2px;
	}
	&:hover:enabled {
		background: ${({ theme, type }) => theme.colors.hover[type || 'primary']};
	}
	&:not(:enabled) {
		cursor: default;
	}

	@media (min-width: 768px) {
		box-shadow: ${({ theme }) => theme.box_shadow.secondary};
		grid-column: 3;
	}
`;

export const MainButton = styled(Button).attrs({ as: 'button' })`
	height: 40px;
	background: ${({ theme }) => theme.colors.success};
	border-radius: 5px;
	font-weight: 700;
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	transition: background 0.3s;
	&:hover {
		background: ${({ theme }) => theme.colors.hover.success};
	}
	@media (min-width: 768px) {
		grid-column: 3;
	}
`;

export const Link = styled(Button).attrs({ as: NavLink })`
	&:hover {
		background: ${({ theme }) => theme.colors.hover['primary']};
		cursor: pointer;
	}
`;
