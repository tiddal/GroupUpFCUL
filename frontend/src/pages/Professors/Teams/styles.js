import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';
import { NavLink } from 'react-router-dom';

export const Container = styled(Wrapper)`
	padding-top: 145px;
	height: 100vh;
	@media (min-width: 768px) {
		padding-top: 200px;
		height: auto;
		display: flex;
		justify-content: center;
		padding-bottom: 100px;
	}
`;

export const Sheet = styled.div`
	border-radius: 20px 20px 0 0;
	background: ${({ theme }) => theme.colors.background};
	height: auto;
	min-height: 100%;
	box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (min-width: 768px) {
		padding: 30px 40px 40px 40px;
		width: 660px;
		border-radius: 10px;
		box-shadow: ${({ theme }) => theme.box_shadow.primary};
	}
	@media (min-width: 1450px) {
		width: 960px;
		padding: 30px 40px 60px 40px;
	}
`;

export const Title = styled.div`
	color: ${({ theme: { colors } }) => colors.text};
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 0;
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

export const SearchSection = styled.form`
	width: 100%;
	height: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 30px 0;
	& > span {
		width: 100%;
		font-size: 10px;
		color: ${({ theme }) => theme.colors.secondary_text};
		padding-left: 12px;
	}
	@media (min-width: 768px) {
		height: 60px;
		margin: 50px 0;
		& > span {
			font-size: 12px;
			padding-left: 20px;
		}
	}
	@media (min-width: 1450px) {
		justify-content: space-evenly;
		& > span {
			margin-top: 5px;
			width: 96%;
		}
	}
`;

export const SearchBar = styled.input`
	width: 90%;
	height: 24px;
	border-radius: 12px;
	font-size: 10px;
	background: ${({ theme }) => theme.colors.surface};
	color: ${({ theme }) => theme.colors.text};
	padding: 0 12px;
	@media (min-width: 768px) {
		height: 40px;
		border-radius: 20px;
		padding: 0 20px;
		font-size: 16px;
	}
`;

export const Button = styled.button`
	width: 24px;
	height: 24px;
	color: white;
	background: ${({ theme }) => theme.colors.primary};
	border-radius: 10px;
	font-size: 10px;
	line-height: 12px;
	@media (min-width: 768px) {
		height: 40px;
		width: 40px;
		border-radius: 15px;
		font-size: 14px;
	}
	@media (min-width: 1450px) {
		transition: background 0.25s;
		&:hover {
			cursor: pointer;
			background: ${({ theme: { colors } }) => colors.primary_variant};
		}
	}
`;

export const Link = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20px;
	height: 15px;
	color: white;
	background: ${({ theme }) => theme.colors.primary};
	text-align: center;
	border-radius: 10px;
	@media (min-width: 768px) {
		height: 25px;
		width: 30px;
	}
	@media (min-width: 1450px) {
		transition: background 0.25s;
		&:hover {
			background: ${({ theme: { colors } }) => colors.primary_variant};
		}
	}
`;

export const RemoveButton = styled(Link).attrs({ as: 'button' })`
	background: ${({ theme }) => theme.colors.danger};
	@media (min-width: 1450px) {
		&:hover {
			cursor: pointer;
			background: red;
		}
	}
`;

export const TableSection = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
`;

export const Avatar = styled.span`
	display: grid;
	justify-content: center;
	align-content: center;
	margin: auto;
	height: 15px;
	width: 15px;
	background: orange;
	border-radius: 50%;
	overflow: hidden;
	& > span {
		color: #fff;
		font-size: 9px;
		line-height: 10px;
		font-weight: 700;
		text-transform: capitalize;
	}
	& > img {
		height: 15px;
		width: 15px;
	}

	@media (min-width: 768px) {
		height: 20px;
		width: 20px;
		& > span {
			line-height: 15px;
			font-size: 13px;
		}
		& > img {
			height: 20px;
			width: 20px;
		}
	}

	@media (min-width: 1450px) {
		height: 25px;
		width: 25px;
		& > span {
			line-height: 18px;
			font-size: 16px;
		}
		& > img {
			height: 25px;
			width: 25px;
		}
	}
`;
