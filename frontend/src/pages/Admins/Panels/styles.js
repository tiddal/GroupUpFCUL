import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

export const Container = styled(Wrapper)`
	display: grid;
	margin-top: 80px;
	width: 100%;
	gap: 25px;
	justify-items: center;
	margin-bottom: 45px;
	@media (min-width: 768px) {
		margin-top: 145px;
		gap: 53px;
		grid-template-columns: 184px 184px 184px;
		justify-content: center;
		align-content: center;
	}
	@media (min-width: 1450px) {
		grid-template-columns: 285px 285px 285px;
	}
`;

export const StatusCardData = styled.div`
	display: flex;
	align-items: center;
	& > span {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: ${({ status, theme }) =>
			status === 'online' ? theme.colors.success : theme.colors.secondary_text};
		margin-left: 10px;
		@media (min-width: 768px) {
			width: 10px;
			height: 10px;
			margin-left: 20px;
		}
	}
`;
