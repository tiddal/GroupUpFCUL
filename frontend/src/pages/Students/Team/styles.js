import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';
import { NavLink } from 'react-router-dom';

export const Container = styled(Wrapper)`
	padding-top: 150px;
	width: 100%;
	display: grid;
	grid-template-rows: minmax(662px, max-content);
	@media (min-width: 768px) {
		padding-bottom: 40px;
		padding-top: 200px;
		justify-content: center;
		grid-template-rows: minmax(755px, max-content);
	}
`;

export const Content = styled.div`
	background: ${({ theme }) => theme.colors.background};
	box-shadow: ${({ theme }) => theme.box_shadow.primary};
	border-radius: 20px 20px 0 0;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 75px 45px auto;
	overflow: hidden;
	@media (min-width: 768px) {
		padding-bottom: 0;
		border-radius: 10px;
		grid-template-columns: 660px;
	}
	@media (min-width: 1450px) {
		grid-template-columns: 960px;
	}
`;

export const Title = styled.div`
	color: ${({ theme: { colors } }) => colors.text};
	display: flex;
	align-items: center;
	padding: 0 30px;
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

export const Navigation = styled.nav`
	background: #191a21;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	display: grid;
	grid-template-columns: repeat(5, 175px);
	border-top: 1px solid #191a21;
	gap: 1px;
	overflow-x: auto;
	-ms-overflow-style: none;
	::-webkit-scrollbar {
		display: none;
	}
	@media (min-width: 1450px) {
		grid-template-columns: repeat(5, 1fr);
	}
`;

export const Link = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 700;
	color: #ffffff;
	text-decoration: none;
	transition: background 0.3s ease;
	background: #232740;
	position: relative;
	cursor: pointer;
	svg {
		margin-right: 10px;
		font-size: 16px;
	}
	&.active {
		background: #191a21;
		&::before {
			content: '';
			width: 125px;
			height: 5px;
			background: #e99c28;
			border-radius: 5px 5px 0px 0px;
			position: absolute;
			bottom: 0;
		}
	}
	&:hover {
		background: #191a21;
	}
`;
