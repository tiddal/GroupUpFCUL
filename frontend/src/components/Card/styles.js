import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
	background: ${({ theme: { colors } }) => colors.background};
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	border-radius: 10px;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 50px 150px 50px;
	overflow: hidden;
	@media (min-width: 768px) {
		grid-template-columns: 100%;
		grid-template-rows: 50px 100px 50px;
	}
	@media (min-width: 1450px) {
		grid-template-columns: 100%;
		grid-template-rows: 50px 100px 50px;
	}
`;

export const TwoThirdsContainer = styled(Container)`
	grid-column: 1 / -1;

	@media (min-width: 768px) {
		grid-column: 1 / span 2;
		grid-row: 1 / -1;
	}
	@media (min-width: 1450px) {
		grid-column: 1 / span 2;
		grid-row: 1 / -1;
	}
`;

export const MiniContainer = styled(Container)`
	grid-column: unset;
	justify-content: space-around;
	border-radius: 5px;
	display: flex;
	align-items: center;
	span {
		font-size: 12px;
		font-weight: 700;
		color: ${({ theme: { colors } }) => colors.text};
		text-transform: uppercase;
		text-align: center;
	}
	@media (min-width: 768px) {
		border-radius: 10px;
		span {
			font-size: 20px;
		}
	}
`;

export const SmallContainer = styled.div`
	width: 285px;
	height: 250px;
	background: ${({ theme: { colors } }) => colors.background};
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	border-radius: 10px;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 50px 150px 50px;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
`;

export const XSmallContainer = styled(SmallContainer)`
	width: 285px;
	height: 135px;
	grid-template-rows: 85px 50px;
	border-radius: 10px;
	@media (min-width: 768px) {
		width: 184px;
	}
	@media (min-width: 1450px) {
		width: 285px;
	}
`;

export const BigContainer = styled(SmallContainer)`
	@media (min-width: 1450px) {
		width: 960px;
		grid-column: 1 / span 3;
	}
`;

export const StatusContainer = styled(SmallContainer)`
	display: flex;
	width: 285px;
	height: 40px;
	flex-direction: row;
	justify-content: space-around;
	border-radius: 0;
	align-items: center;
	background: ${({ theme }) => theme.colors.background};
	border-radius: 10px;
	text-transform: capitalize;
	color: ${({ theme }) => theme.colors.text};
	font-size: 11px;
	font-weight: 600;
	@media (min-width: 768px) {
		width: 660px;
		height: 75px;
		font-size: 20px;
		grid-column: 1 / span 3;
	}
	@media (min-width: 1450px) {
		width: 960px;
	}
`;

export const SearchCardContainer = styled(SmallContainer)`
	display: flex;
	width: 285px;
	height: 175px;
	border-radius: 0;
	align-items: center;
	border-radius: 10px;
	flex-direction: column;
	justify-content: flex-start;
	@media (min-width: 768px) {
		width: 660px;
		height: 250px;
		grid-column: 1 / span 3;
	}
	@media (min-width: 1450px) {
		width: 960px;
		height: 250px;
	}
`;

export const Title = styled.div`
	color: ${({ theme: { colors } }) => colors.text};
	display: flex;
	align-items: center;
	padding: 20px 30px 0 30px;
	margin-bottom: 0;
	& > span {
		font-size: 20px;
		text-transform: uppercase;
		font-weight: 700;
	}
	& > svg {
		font-size: 16px;
		margin-right: 15px;
	}
`;

export const SmallTitle = styled(Title)`
	width: 100%;
	padding-left: 30px;
	& > span {
		font-size: 16px;
	}
	& > svg {
		font-size: 14px;
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

export const Content = styled.div`
	padding: 30px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	& > * {
		margin: 5px 0;
		text-align: center;
	}
`;

export const SearchBar = styled.form`
	margin-top: 30px;
	width: 250px;
	height: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	@media (min-width: 768px) {
		width: 550px;
		height: 60px;
	}
	@media (min-width: 1450px) {
		margin-top: 50px;
		width: 800px;
	}

	& > input {
		background: ${({ theme }) => theme.colors.placeholder};
		width: 80%;
		height: 24px;
		border-radius: 12px;
		font-size: 10px;
		padding-left: 12px;
		padding-right: 12px;
		color: ${({ theme }) => theme.colors.text};
		line-height: 25px;
		@media (min-width: 768px) {
			width: 90%;
			height: 40px;
			border-radius: 20px;
			font-size: 16px;
			padding-left: 20px;
			padding-right: 20px;
		}

		&::placeholder {
			color: ${({ theme }) => theme.colors.secondary_text};
		}
	}

	& > button {
		width: 24px;
		height: 24px;
		background: ${({ theme }) => theme.colors.primary};
		border-radius: 10px;

		@media (min-width: 768px) {
			width: 40px;
			height: 40px;
		}
		@media (min-width: 1450px) {
			transition: background 0.25s;
			&:hover {
				cursor: pointer;
				background: ${({ theme: { colors } }) => colors.primary_variant};
			}
		}
		& > svg {
			color: white;
			font-size: 10px;
			@media (min-width: 768px) {
				font-size: 16px;
			}
		}
	}

	& > span {
		font-size: 9px;
		color: ${({ theme }) => theme.colors.secondary_text};
		width: 100%;
		padding-left: 12px;
		margin-top: 3px;
		@media (min-width: 768px) {
			font-size: 12px;
			padding-left: 20px;
			margin-top: 5px;
		}
	}
`;

export const Link = styled(NavLink)`
	border-top: 1px solid ${({ theme: { colors } }) => colors.surface};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	line-height: 12px;
	font-weight: 600;
	color: ${({ theme: { colors } }) => colors.primary_variant};
	@media (min-width: 1450px) {
		transition: background 0.25s;
		&:hover {
			background: ${({ theme: { colors } }) => colors.surface};
		}
	}
`;

export const Icon = styled.div`
	width: 100%;
	height: 88px;
	display: flex;
	align-items: center;
	justify-content: center;
	& > svg {
		font-size: 30px;
		color: ${({ theme: { colors } }) => colors.text};
	}
`;
