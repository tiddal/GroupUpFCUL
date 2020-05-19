import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
	position: absolute;
	left: 25px;
	top: 85px;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.primary_variant};

	@media (min-width: 768px) {
		left: 125px;
		top: 110px;
		font-size: 16px;
	}
	@media (min-width: 1450px) {
		left: 350px;
	}
`;

export const Link = styled(NavLink)`
	text-decoration: none;
	color: inherit;
	&.active {
		text-decoration: underline;
	}
`;
