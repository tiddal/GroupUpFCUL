import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background: #232740;
	z-index: 51;
	padding-top: 55px;
	transition: transform 0.3s ease;
	transform: ${({ profilebarState }) => {
		if (profilebarState) return 'translateX(0)';
		return 'translateX(100%)';
	}};

	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		transform: ${({ profilebarState }) => {
			if (profilebarState) return 'translateY(0)';
			return 'translateY(-110%)';
		}};
		height: auto;
		width: 250px;
		top: 60px;
		right: 5px;
		border-radius: 10px;
		padding: 20px 0;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
	}
`;

export const User = styled(NavLink)`
	margin-top: 25px;
	display: flex;
	align-items: center;
	text-decoration: none; /* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		margin-top: 0;
	}
`;

export const UserAvatar = styled.div`
	margin: 0 30px;
	height: 50px;
	width: 50px;
	background: transparent;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	&:hover {
		cursor: pointer;
	}
	& > img,
	div {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
	}
	& > div {
		background: orange;
		display: flex;
		align-items: center;
		justify-content: center;
		& > span {
			height: 40px;
			color: #fff;
			font-size: 28px;
			font-weight: 700;
			text-align: center;
			text-transform: capitalize;
		}
	}
`;

export const UserDetails = styled.div`
	display: flex;
	flex-direction: column;
	color: #fff;
	font-size: 10px;
	& :first-child {
		font-size: 13px;
		font-weight: 600;
	}
`;

export const ItemGroup = styled.div`
	margin-top: 25px;
	display: flex;
	border-top: 1px solid #1f2231;
	border-bottom: 1px solid #1f2231;
	flex-direction: column;

	@media (min-width: 768px) {
		margin-top: 15px;
		border-bottom: none;
	}
`;

export const ItemButton = styled.button`
	color: white;
	height: 45px;
	display: flex;
	align-items: center;
	font-size: 16px;
	text-decoration: none;
	& > svg {
		margin: 0 29.5px;
		&:last-child {
			font-size: 24px;
			margin-left: auto;
		}
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
`;
