import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SmallContainer = styled.div`
	width: 285px;
	height: 250px;
	background: ${({ theme: { colors } }) => colors.background};
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
`;

export const BigContainer = styled(SmallContainer)`
	@media (min-width: 1200px) {
		width: 960px;
		grid-column: 1 / span 3;
	}
`;

export const Title = styled.div`
	color: ${({ theme: { colors } }) => colors.text};
	display: flex;
	align-items: center;
	margin: 20px 30px;
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

export const Info = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

export const Link = styled(NavLink)`
	width: 100%;
	height: 47px;
	border-top: 1px solid ${({ theme: { colors } }) => colors.surface};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	line-height: 12px;
	font-weight: 600;
	color: ${({ theme: { colors } }) => colors.primary_variant};
	text-transform: capitalize;
	@media (min-width: 1200px) {
		transition: background 0.25s;
		&:hover {
			background: ${({ theme: { colors } }) => colors.surface};
		}
	}
`;
