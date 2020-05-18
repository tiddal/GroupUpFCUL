import styled from 'styled-components';

export const Container = styled.div``;

export const Cards = styled.div`
	padding-top: 120px;
	display: grid;
	gap: 45px;
	justify-items: center;
	margin-bottom: 45px;
	@media (min-width: 768px) {
		padding-left: 75px;
		grid-template-columns: 285px 285px;
		grid-template-rows: 250px;
		justify-content: center;
		align-content: center;
		padding-top: 55px;
		gap: 55px;
		height: 100vh;
		margin-bottom: 0;
	}
	@media (min-width: 1200px) {
		padding-left: 250px;
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
	@media (min-width: 1200px) {
		justify-content: space-around;
		flex-direction: row;
		width: 100%;
		& > span {
			font-size: 24px;
			margin: 0;
		}
	}
`;

export const Spinner = styled.div`
	display: block;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		display: block;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 2px solid ${({ color }) => color};
		border-color: ${({ theme }) => theme.colors.primary_variant} transparent
			${({ theme }) => theme.colors.primary_variant} transparent;
		animation: lds-dual-ring 1.2s linear infinite;
		@media (min-width: 768px) {
			left: 75px;
		}
		@media (min-width: 1200px) {
			left: 250px;
		}
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
