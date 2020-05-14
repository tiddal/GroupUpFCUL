import styled from 'styled-components';

export const Container = styled.nav`
	padding: 0 14px 0 10px;
	width: 100%;
	height: 55px;
	background: ${({ theme }) => theme.colors.primary};
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Logo = styled.div`
	height: 30px;
`;

export const Menu = styled.button`
	height: 40px;
	width: 40px;
	background: transparent;
	border: none;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	& > svg {
		color: white;
		font-size: 18px;
	}
	&:hover {
		background: ${({ theme }) => theme.colors.primary_variant_two};
		cursor: pointer;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
	}

	& > img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
	}
`;

export const Avatar = styled.button`
	height: 40px;
	width: 40px;
	background: transparent;
	border: none;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	&:hover {
		background: ${({ theme }) => theme.colors.primary_variant_two};
		cursor: pointer;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
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
		color: #fff;
		font-size: 18px;
		font-weight: 700;
		line-height: 32px;
		text-align: center;
		text-transform: capitalize;
	}
`;
