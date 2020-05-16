import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
	width: 285px;
	height: 250px;
	background: ${({ theme: { colors } }) => colors.background};
	box-shadow: ${({ theme }) => theme.box_shadow.secondary};
	border-radius: 10px;
	margin-bottom: 45px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const Title = styled.div`
	color: ${({ theme: { colors } }) => colors.text};
	display: flex;
	align-items: center;
	margin: 20px 30px;
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

export const Link = styled(NavLink)`
	width: 100%;
	height: 45px;
	border-top: 1px solid ${({ theme: { colors } }) => colors.surface};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	line-height: 12px;
	font-weight: 600;
	color: ${({ theme: { colors } }) => colors.primary_variant};
`;
