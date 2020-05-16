import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #232740;
	z-index: 2;
	padding-top: 55px;
	transition: transform 0.3s ease;
	transform: ${({ profilebarState, sidebarState }) => {
		if (sidebarState && !profilebarState) return 'translateX(0)';
		return 'translateX(-100%)';
	}};
	box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.25);

	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		width: 250px;
	}
	/* Large devices (desktops, 1200px and up) */
	@media (min-width: 1200px) {
		width: 250px;
		transform: ${({ sidebarState }) =>
			!sidebarState ? 'translateX(0)' : 'translateX(-100%)'};
	}
`;

export const StaticContainer = styled.div`
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 75px;
	height: 100%;
	background: #232740;
	z-index: 99;
	padding-top: 55px;
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		display: block;
	}
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 1200px) {
		display: none;
	}
`;

export const ItemGroup = styled.div`
	margin-top: 25px;
	display: flex;
	border-top: 1px solid #1f2231;
	border-bottom: 1px solid #1f2231;
	flex-direction: column;
`;

export const Item = styled(NavLink)`
	color: white;
	height: 45px;
	display: flex;
	align-items: center;
	font-size: 16px;
	text-decoration: none;
	& > svg {
		margin: 0 29.5px;
	}

	& > span {
		padding-left: 25px;
		font-weight: 700;
		/* Medium devices (tablets, 768px and up) */
		@media (min-width: 768px) {
			padding-left: 0;
		}
	}

	&:hover {
		cursor: pointer;
	}

	&.active {
		background: #191a21;
		& > svg {
			margin: 0 29.5px 0 24.5px;
		}
		&::before {
			content: '';
			width: 5px;
			height: 25px;
			background: #e99c28;
			border-radius: 0px 5px 5px 0px;
		}
	}
`;
