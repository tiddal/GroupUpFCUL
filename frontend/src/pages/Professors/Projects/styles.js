import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';
import { NavLink } from 'react-router-dom';

export const Container = styled(Wrapper)`
	padding-top: 150px;
	padding-bottom: 45px;
	display: grid;
	grid-template-columns: 285px;
	grid-template-rows: 40px auto;
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
	height: ${({ expand }) => (expand ? '525px' : '75px')};
	transition: height 0.3s;
	grid-template-rows: 75px auto;
	@media (min-width: 768px) {
		grid-template-rows: 80px auto;
		height: ${({ expand }) => (expand ? '420px' : '80px')};
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
	height: ${({ expand }) => (expand ? '450px' : '0px')};
	transition: height 0.3s;
	border-top: 2px solid ${({ theme }) => theme.colors.surface};
	padding: 25px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 200px repeat(3, 40px);
	gap: 20px;
	@media (min-width: 768px) {
		height: ${({ expand }) => (expand ? '340px' : '0px')};
		padding: 25px 60px;
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
		display: flex;
		padding: 10px 0;
		font-size: 12px;
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

export const Button = styled(NavLink)`
	grid-column: 1 / -1;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.primary};
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
	&:hover {
		background: ${({ theme }) => theme.colors.hover.primary};
	}
	@media (min-width: 768px) {
		grid-column: unset;
		box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	}
`;

export const MainButton = styled(Button)`
	background: ${({ theme }) => theme.colors.success};
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
