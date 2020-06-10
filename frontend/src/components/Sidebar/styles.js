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
	transform: ${({ sidebarState }) => {
		if (sidebarState) return 'translateX(0)';
		return 'translateX(-100%)';
	}};

	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		width: 250px;
		box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.25);
		transform: ${({ sidebarState }) => {
			if (sidebarState) return 'translateX(0)';
			return 'translateX(-100%)';
		}};
	}
	/* Large devices (desktops, 1450px and up) */
	@media (min-width: 1450px) {
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
	@media (min-width: 1450px) {
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
	justify-content: flex-start;
	align-items: center;
	text-decoration: none;
	transition: background 0.3s ease;
	div {
		height: 100%;
		width: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			font-size: 16px;
		}
		div {
			width: 32px;
			height: 16px;
			background: #fff;
			font-size: 10px;
			font-weight: 700;
			color: #232740;
			border-radius: 4px;
		}
	}

	span {
		display: inline-block;
		padding-left: 25px;
		padding-right: 20px;
		font-weight: 700;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		@media (min-width: 768px) {
			width: 175px;
			padding-left: 0;
		}
	}

	&:hover {
		cursor: pointer;
		background: #191a21;
	}

	&.active {
		background: #191a21;
		&::before {
			content: '';
			width: 5px;
			height: 25px;
			background: #e99c28;
			border-radius: 0px 5px 5px 0px;
			position: absolute;
		}
	}
`;
