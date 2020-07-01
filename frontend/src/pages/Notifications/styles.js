import styled from 'styled-components';
import { Wrapper } from '../../components/Wrapper';

export const Container = styled(Wrapper)`
	display: grid;
	justify-items: center;
	align-items: center;
	height: 100%;
	div {
		width: 325px;
		height: 325px;
		background: ${({ theme }) => theme.colors.background};
		border-radius: 50%;
		padding: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: ${({ theme }) => theme.box_shadow.primary};

		svg {
			width: 175px;
			height: 175px;
			fill: ${({ theme }) => theme.colors.primary_variant};
		}
		p {
			color: ${({ theme }) => theme.colors.primary_variant};
			font-weight: 700;
			margin-top: 10px;
		}
	}
`;
