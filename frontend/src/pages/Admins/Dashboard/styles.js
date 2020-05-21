import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

export const Container = styled(Wrapper)`
	margin-top: 65px;
	display: grid;
	gap: 45px;
	justify-items: center;
	margin-bottom: 45px;
	@media (min-width: 768px) {
		margin: 0;
		height: 100vh;
		grid-template-columns: 285px 285px;
		grid-template-rows: 250px;
		justify-content: center;
		align-content: center;
		gap: 55px;
	}
	@media (min-width: 1450px) {
		grid-template-columns: repeat(3, 285px);
		grid-template-rows: 250px;
	}
`;

export const SmallCardData = styled.div`
	font-size: 13px;
	font-weight: 700;
	display: flex;
	align-items: center;
	text-transform: uppercase;
	margin: 5px;
	color: ${({ status, theme }) =>
		status === 'online' ? theme.colors.text : theme.colors.secondary_text};
	& > span {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: ${({ status, theme }) =>
			status === 'online' ? theme.colors.success : theme.colors.secondary_text};
		margin-left: 10px;
	}
`;

export const BigCardData = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	& > span {
		color: ${({ theme }) => theme.colors.text};
		font-size: 13px;
		text-transform: uppercase;
		font-weight: 700;
		margin: 5px;
	}
	@media (min-width: 1450px) {
		justify-content: space-around;
		flex-direction: row;
		width: 100%;
		& > span {
			font-size: 24px;
			margin: 0;
		}
	}
`;
