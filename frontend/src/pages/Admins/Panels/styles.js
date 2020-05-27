import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

export const Container = styled(Wrapper)`
	padding-top: 150px;
	margin-bottom: 100px;
	display: grid;
	width: 100%;
	height: 100%;
	gap: 25px;
	justify-items: center;
	@media (min-width: 768px) {
		padding-top: 0;
		margin-bottom: 0;
		gap: 53px;
		grid-template-columns: 184px 184px 184px;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
	@media (min-width: 1450px) {
		padding-top: 200px;
		padding-bottom: 100px;
		grid-template-columns: 285px 285px 285px;
		grid-template-rows: 75px 250px 135px;
		align-content: unset;
		align-items: unset;
	}
`;

export const SearchSection = styled.form`
	width: 80%;
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
		margin-top: 5px;
	}
	@media (min-width: 768px) {
		justify-content: space-evenly;
		height: 60px;
		margin: 50px 0;
		& > span {
			width: 94%;
			font-size: 12px;
			padding-left: 20px;
		}
	}
`;

export const SearchBar = styled.input`
	width: 85%;
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
	display: flex;
	justify-content: center;
	align-items: center;
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
