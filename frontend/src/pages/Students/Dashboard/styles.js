import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

export const Container = styled(Wrapper)`
	padding-top: 110px;
	padding-bottom: 45px;
	display: grid;
	grid-template-columns: 285px;
	justify-content: center;
	gap: 40px;
	@media (min-width: 768px) {
		margin: 0;
		padding-top: 150px;
		grid-template-columns: 660px;
		align-content: center;
	}
	@media (min-width: 1450px) {
		padding-bottom: 75px;
		grid-template-columns: 960px;
	}
`;

export const InfoSection = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 250px 30px;
	gap: 25px 19px;
	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 40px 37.5px;
	}
	@media (min-width: 1450px) {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 22px 53px;
	}
`;

export const UnitsSection = styled(InfoSection)`
	grid-template-rows: 250px;
	grid-template-columns: 285px;
	gap: 40px;
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 200px;
		gap: 60px;
	}
	@media (min-width: 1450px) {
		grid-template-rows: 200px;
		grid-template-columns: repeat(3, 1fr);
		gap: 53px;
	}
`;

export const GroupsSection = styled(UnitsSection)`
	@media (min-width: 1450px) {
		grid-template-rows: 200px;
		grid-template-columns: repeat(2, 1fr);
		gap: 53px;
	}
`;

export const NextClassName = styled.span`
	font-size: 18px;
	font-weight: 600;
	text-transform: uppercase;
	color: ${({ theme }) => theme.colors.text};
`;

export const NextClassDate = styled(NextClassName)`
	font-size: 12px;
	font-weight: unset;
	text-transform: unset;
`;

export const UnitInfo = styled(NextClassName)`
	font-size: 14px;
	text-transform: capitalize;
	font-weight: 600;
`;

export const Submission = styled(NextClassName)`
	font-size: 16px;
	text-transform: unset;
	font-weight: unset;
`;

export const SubmissionDate = styled(UnitInfo)`
	text-transform: lowercase;
	font-weight: 600;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.secondary_text};
`;
