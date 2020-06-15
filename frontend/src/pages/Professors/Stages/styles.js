import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

export const Container = styled(Wrapper)`
	padding-top: 150px;
	padding-bottom: 45px;
	display: grid;
	grid-template-columns: 285px;
	justify-content: center;
	gap: 40px;
	@media (min-width: 768px) {
		margin: 0;
		padding-top: 200px;
		grid-template-columns: 660px;
		align-content: center;
	}
	@media (min-width: 1450px) {
		padding-bottom: 75px;
		grid-template-columns: 960px;
	}
`;

export const Content = styled.div`
	display: grid;
	grid-template-columns: 285px;
	gap: 40px;
	grid-template-rows: 250px;
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 200px;
		gap: 60px;
	}
	@media (min-width: 1450px) {
		gap: 53px;
	}
`;

export const Details = styled.div`
	font-size: 16px;
	color: ${({ theme }) => theme.colors.text};
	p {
		text-transform: lowercase;
		font-weight: 600;
		font-size: 12px;
		color: ${({ theme }) => theme.colors.secondary_text};
	}
`;
