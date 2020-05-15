import styled from 'styled-components';

export const Container = styled.nav`
	position: fixed;
	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
	padding: 0 14px 0 10px;
	width: 100%;
	height: 55px;
	background: ${({ theme }) => theme.colors.primary};
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 4;

	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		justify-content: flex-start;
		padding: 0;
	}
`;

export const Logo = styled.div`
	height: 30px;
`;

export const Menu = styled.button`
	height: 40px;
	width: 40px;
	background: transparent;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	& > svg {
		color: white;
		font-size: 18px;
	}
	&:hover {
		cursor: pointer;
	}

	& > img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
	}

	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		height: 39px;
		width: 39px;
		margin: 0 18px 0 18px;
	}
`;

export const User = styled.div`
	display: flex;
	align-items: center;

	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		margin-left: auto;
	}
`;

export const UserAvatar = styled.button`
	height: 40px;
	width: 40px;
	background: transparent;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	&:hover {
		cursor: pointer;
	}

	& > img,
	div {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
	}
	& > div {
		background: orange;
		display: flex;
		align-items: center;
		justify-content: center;
		& > span {
			height: 25px;
			color: #fff;
			font-size: 18px;
			font-weight: 700;
			text-align: center;
			text-transform: capitalize;
		}
	}

	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		height: 39px;
		width: 39px;
		margin-right: 18px;
	}
`;

export const UserName = styled.button`
	display: none;
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		display: block;
		height: 25px;
		width: auto;
		background: ${({ theme: { colors } }) => colors.primary_variant_two};
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
		border-radius: 16px 0 0 16px;
		color: white;
		font-size: 12px;
		font-weight: 600;
		padding: 0 26px 0 20px;
		margin-right: -20px;
		overflow: hidden;
		&:hover {
			cursor: pointer;
		}
	}
`;
